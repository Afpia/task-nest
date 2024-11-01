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
        $userRole = $this->workspaceService->getUserRoleInWorkspace($workspace, auth()->user());

        return response()->json([
            'workspace' => $workspace,
            'role' => $userRole
        ]);
    }

    public function store(Request $request)
    {
        $title = $request->title ?? 'new Workspace';

        $workspace = $this->workspaceService->createWorkspace($title);

        return response()->json(['massage' => 'добавление успешно'], 201);
    }

    public function update(Request $request, Workspace $workspace)
    {
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

        return response()->json(['message' => 'удаление успешно'], 202);
    }

    public function workspaceUsers(Workspace $workspace)
    {
        return response()->json($workspace->users);
    }

    public function manageUserInWorkspace(Request $request, Workspace $workspace)
    {
        $currentUser = $request->user();

        $currentUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $currentUser);

        if ($currentUserRole !== 'owner') {
            return response()->json(['message' => 'Доступ запрещен. Только владелец может добавлять пользователей'], 403);
        }

        $userId = $request->user_id;
        $role = $request->input('role', 'executor');

        if ($userId === $currentUser->id) {
            return response()->json(['message' => 'Вы не можете изменить свою роль'], 403);
        }

        $this->workspaceService->manageUserInWorkspace($workspace, $userId, $role);

        return response()->json(['message' => 'Успешно'], 201);
    }
}
