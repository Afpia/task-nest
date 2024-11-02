<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use App\Services\QueryService;
use App\Services\WorkspaceService;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    protected $workspaceService;
    protected $queryService;

    public function __construct(WorkspaceService $workspaceService, QueryService $queryService)
    {
        $this->workspaceService = $workspaceService;
        $this->queryService = $queryService;
    }

    public function index(Request $request)
    {
        $filters = $request->input('filters', []);
        $columns = $request->input('columns', ['*']);
        $perPage = $request->input('per_page');

        $query = Workspace::query();
        $query = $this->queryService->applyFilters($query, $filters);
        $query = $this->queryService->selectColumns($query, $columns);
        $workspaces = $this->queryService->paginateResults($query, $perPage);

        return response()->json($workspaces);
    }

    public function show(Request $request, Workspace $workspace)
    {
        $columns = $request->input('columns', ['*']);
        $workspace = $this->queryService->selectColumns($workspace->newQuery(), $columns)->find($workspace->id);

        return response()->json([
            'workspace' => $workspace,
        ]);
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255'
        ]);

        $title = $validate['title'] ?? 'new Workspace';

        $workspace = $this->workspaceService->createWorkspace($title);

        return response()->json(['message' => __('messages.add_success')], 201);
    }

    public function update(Request $request, Workspace $workspace)
    {
        $this->authorize('manage', $workspace);
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $updatedWorkspace = $this->workspaceService->updateWorkspace($validate, $workspace);

        return response()->json($updatedWorkspace, 201);
    }

    public function destroy(Workspace $workspace)
    {
        $this->workspaceService->deleteWorkspace($workspace);
        return response()->json(['message' => __('messages.delete_success')], 202);
    }

    public function workspaceUsers(Workspace $workspace)
    {
        $workspaceWithUsers = $workspace->load('users');
        $sanitizedUsers = $workspaceWithUsers->users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];
        });
        return response()->json($sanitizedUsers);
    }

    public function manageUserInWorkspace(Request $request, Workspace $workspace)
    {
        $validate = $request->validate([
            'user_id' => 'required|integer',
            'role' => 'string|in:admin,project_manager,executor'
        ]);

        $currentUser = $request->user();
        $userId = $validate['user_id'];
        $role = $validate['role'];

        $currentUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $currentUser->id);

        if ($currentUserRole === 'admin' && ($role === 'admin' || $role === 'owner')) {
            return response()->json(['message' => __('messages.cannot_assign_admin_or_owner')], 403);
        }

        $targetUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $userId);
        if ($currentUserRole === 'admin' && ($targetUserRole === 'admin' || $targetUserRole === 'owner')) {
            return response()->json(['message' => __('messages.cannot_change_admin_or_owner_role')], 403);
        }

        if ($userId === $currentUser->id) {
            return response()->json(['message' => __('messages.cannot_change_own_role')], 403);
        }

        $this->workspaceService->manageUserInWorkspace($workspace, $userId, $role);

        return response()->json(['message' => __('messages.success')], 201);
    }

    public function addUserToWorkspace(Request $request, Workspace $workspace)
    {
        $validate = $request->validate([
            'user_id' => 'required|integer',
        ]);

        $userId = $validate['user_id'];

        $this->workspaceService->manageUserInWorkspace($workspace, $userId);

        return response()->json(['message' => __('messages.user_added')], 201);
    }

    public function leave(Request $request, Workspace $workspace)
    {
        $this->workspaceService->deleteUserFromWorkspace($workspace, $request->user()->id);

        return response()->json(['message' => __('messages.user_left')], 202);
    }
}