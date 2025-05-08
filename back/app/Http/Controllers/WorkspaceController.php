<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use App\Services\QueryService;
use App\Services\WorkspaceService;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\Rule;

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
        $filters = $request->input('filters', '');
        $columns = $request->input('columns', '*');
        $perPage = $request->input('per_page', false);

        $query = Workspace::query();

        $query = $this->queryService->applyFilters($query, $filters);
        $query = $this->queryService->selectColumns($query, $columns);

        $workspaces = $this->queryService->paginateResults($query, $perPage);

        return response()->json($workspaces);
    }

    public function show(Request $request, Workspace $workspace)
    {
        $columns = $request->input('columns', '*');
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

        return response()->json([
            'message' => __('messages.add_success'),
            'workspace' => $workspace,
        ], 201);
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

    public function workspaceUsers(Request $request, Workspace $workspace)
    {
        $validated = $request->validate([
            'order' => ['sometimes', Rule::in(['asc','desc'])],
        ]);

        $order = $validated['order'] ?? 'asc';

        $rolesDesc  = "'owner','admin','project_manager','executor'";
        $rolesAsc = "'executor','project_manager','admin','owner'";
        $rolesList = $order === 'asc' ? $rolesAsc : $rolesDesc;

        $currentUserId = auth()->id();
        $workspaceWithUsers = $workspace->users()->withPivot('role')->orderByRaw("FIELD(role, {$rolesList})")->get();

        $sanitizedUsers = $workspaceWithUsers->filter(fn($user) => $user->id !== $currentUserId)->map(function ($user) {
            $data = $user->toArray();
            return $data;
        })->values();
        return response()->json($sanitizedUsers);
    }

    public function getUserRole(Request $request, Workspace $workspace)
    {
        $userId = $request->user()->id;
        $role = $this->workspaceService->getUserRoleInWorkspace($workspace, $userId);

        if (!$role) {
            return response()->json(['message' => __('messages.role_not_found')], 404);
        }

        return response()->json(['role' => $role], 200);
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

        if (!$targetUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $userId)) {
            return response()->json(['message' => __('messages.user_not_found')], 404);
        }


        if ($currentUserRole === 'admin' && ($targetUserRole === 'admin' || $targetUserRole === 'owner')) {
            return response()->json(['message' => __('messages.cannot_change_admin_or_owner_role')], 403);
        }

        if ($userId === $currentUser->id) {
            return response()->json(['message' => __('messages.cannot_change_own_role')], 403);
        }

        $this->workspaceService->manageUserInWorkspace($workspace, $userId, $role);

        $user = $workspace->users()->where('user_id', $userId)->firstOrFail();

        return response()->json([
            'message' => __('messages.success'),
            'user' => $user,
        ], 201);
    }

    public function addUserToWorkspace(Request $request, Workspace $workspace)
    {
        $validate = $request->validate([
            'user_id' => 'required|integer',
        ]);

        $userId = $validate['user_id'];

        $already = $workspace->users()
        ->where('user_id', $userId)
        ->exists();

        if ($already) {
            $user = User::find($userId);

            return response()->json([
                'message' => __('messages.user_already_added'),
                'user'    => $user,
            ], 409);
        }

        $this->workspaceService->manageUserInWorkspace($workspace, $userId);

        $workspace->load(['users' => fn($q) => $q->where('user_id', $userId)]);

        $user = $workspace->users->first();

        return response()->json([
            'message' => __('messages.user_added'),
            'user' => $user,
        ], 201);
    }

    public function leave(Request $request, Workspace $workspace)
    {
        $this->workspaceService->deleteUserFromWorkspace($workspace, $request->user()->id);

        return response()->json(['message' => __('messages.user_left')], 202);
    }

    public function kickUserFromWorkspace(Request $request, Workspace $workspace)
    {
        $currentUserId = $request->user()->id;
        $targetUserId = $request->user_id;

        if ($currentUserId === $targetUserId) {
            return response()->json(['message' => __('messages.cannot_kick_self')], 403);
        }

        $currentUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $currentUserId);
        $targetUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $targetUserId);

        if ($currentUserRole !== 'owner' && ($targetUserRole === 'admin' || $targetUserRole === 'owner')) {
            return response()->json(['message' => __('messages.cannot_kick_admin_or_owner')], 403);
        }

        $this->workspaceService->deleteUserFromWorkspace($workspace, $targetUserId);

        $user = User::findOrFail($targetUserId);

        return response()->json(['message' => __('messages.success'), 'user' => $user,], 202);
    }

    public function getTasks(Workspace $workspace)
    {
        $tasks = $workspace->projects()->with('tasks')->get()->pluck('tasks')->flatten();

        return response()->json($tasks);
    }
}