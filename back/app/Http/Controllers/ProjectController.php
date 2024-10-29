<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

class ProjectController extends Controller
{
    private const PROJECT_VALIDATOR = [
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'status' => 'required|in:Создан,В процессе,Завершён',
    ];

    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    public function index()
    {
        $projects = Project::all();
        return response()->json($projects);
    }

    public function show(Project $project)
    {
        $this->authorize('view', $project);

        $userRole = $this->projectService->getUserRoleInProject($project, auth()->user());

        return response()->json([
            'project' => $project,
            'role' => $userRole,
        ]);
    }

    public function userProjects(Request $request)
    {
        return response()->json($request->user()->projects);
    }

    public function projectUsers(Project $project)
    {
        return response()->json($project->users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(self::PROJECT_VALIDATOR);

        $project = $this->projectService->createProject($validated);

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

        return response()->json(['message' => 'Project deleted successfully'], 200);
    }
}
