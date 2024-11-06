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
        'start_date' => 'date',
        'end_date' => 'date|after_or_equal:start_date',
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
                'description' => $project->description,
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
        $validated = $request->validate(self::PROJECT_VALIDATOR);

        $this->projectService->updateProject($project, $validated);

        return response()->json(['message' => 'Проект успешно обнавлен'], 200);
    }

    public function destroy(Project $project)
    {
        $this->projectService->deleteProject($project);

        return response()->json(['message' => 'Проект успешно удален'], 200);
    }

    public function assignProjectManager(Request $request, Project $project)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $this->projectService->assignManager($project, $request->user_id);

        return response()->json(['message' => 'Менеджер проекта успешно назначен'], 200);
    }

    public function kickProjectManager(Request $request, Project $project)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $this->projectService->DeleteManagerFromProject($project, $request->user_id);

        return response()->json(['message' => 'Менеджер проекта успешно отстранен'], 200);
    }

    public function LeaveProject(Request $request, Project $project)
    {
        $this->projectService->DeleteManagerFromProject($project, $request->user()->id);

        return response()->json(['message' => 'Вы вышли из проекта'], 200);
    }
}
