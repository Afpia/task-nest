<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use App\Services\WorkspaceService;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    protected $workspaceService;

    public function __construct(WorkspaceService $workspaceService)
    {
        $this->workspaceService = $workspaceService;
    }

    public function index()
    {
        $workspaces = Workspace::all();
        return response()->json($workspaces);
    }

    public function show(Workspace $workspace)
    {
        $userRole = $this->workspaceService->getUserRoleInWorkspace($workspace, auth()->id());

        return response()->json([
            'workspace' => $workspace,
            'role' => $userRole
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
        if (!$workspace) {
            return response()->json(['message' => 'Workspace not found'], 404);
        }

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
            'role' => 'string|in:owner,admin,project_manager,executor'
        ]);

        $currentUser = $request->user();

        $currentUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $currentUser->id);

        if ($currentUserRole !== 'owner') {
            return response()->json(['message' => __('messages.access_denied')], 403);
        }

        $userId = $validate['user_id'];
        $role = $validate['role'];

        if ($userId === $currentUser->id) {
            return response()->json(['message' => __('messages.cannot_change_own_role')], 403);
        }

        $this->workspaceService->manageUserInWorkspace($workspace, $userId, $role);

        return response()->json(['message' => __('messages.success')], 201);
    }
}