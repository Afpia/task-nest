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

    public function index()
    {
        return response()->json(Project::all());
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

    public function store(Request $request)
    {
        $validated = $request->validate(self::PROJECT_VALIDATOR);

        $project = $this->projectService->createProject($validated);

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

}
