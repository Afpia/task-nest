<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Models\Workspace;
use App\Services\ProjectService;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    private const PROJECT_VALIDATOR = [
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
    ];

    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index(Workspace $workspace)
    {
        $projects = $workspace->projects->map(function ($project) {
            return [
                'id' => $project->id,
                'title' => $project->title,
            ];
        });

        return response()->json($projects);
    }

    public function show(Project $project)
    {
        // $this->authorize('view', $project);

        // $userRole = $this->projectService->getUserRoleInProject($project, auth()->user());

        return response()->json([
            'project' => $project,
        ]);
    }

    // public function userProjects(Request $request)
    // {
    //     return response()->json($request->user()->projects);
    // }

    public function projectUsers(Project $project)
    {
        // return response()->json($project->users);
    }

    public function store(Request $request, Workspace $workspace)
    {
        $validated = $request->validate(self::PROJECT_VALIDATOR);

        $project = $this->projectService->createProject($validated, $workspace->id);

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $this->authorize('update', $project);

        $validated = $request->validate(self::PROJECT_VALIDATOR);

        $updatedProject = $this->projectService->updateProject($project, $validated);

        return response()->json($updatedProject, 200);
    }

    public function destroy(Project $project)
    {
        $this->authorize('delete', $project);
        $this->projectService->deleteProject($project);

        return response()->json(['message' => 'Проект успешно удален'], 200);
    }

    // public function manageUserInProject(Request $request, Project $project)
    // {
    //     $currentUser = $request->user();

    //     $currentUserRole = $this->projectService->getUserRoleInProject($project, $currentUser);

    //     if ($currentUserRole !== 'owner') {
    //         return response()->json(['message' => 'Доступ запрещен. Только владелец может добавлять пользователей'], 403);
    //     }

    //     $userId = $request->user_id;
    //     $role = $request->input('role', 'viewer');

    //     if ($userId === $currentUser->id) {
    //         return response()->json(['message' => 'Вы не можете изменить свою роль'], 403);
    //     }

    //     $this->projectService->attachUserToProject($project, $userId, $role);

    //     return response()->json(['message' => 'Успешно'], 201);
    // }

}
