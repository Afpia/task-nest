<?php
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Workspace;
use App\Services\ProjectService;
use App\Services\WorkspaceService;
use App\Models\User;
use App\Services\QueryService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class ProjectController extends Controller
{
    private const PROJECT_VALIDATOR = [
        'title' => 'string|max:255',
        'description' => 'nullable|string',
        'start_date' => 'date',
        'end_date' => 'date|after_or_equal:start_date',
        'status'   => 'in:Завершён'
    ];

    protected $projectService;
    protected $workspaceService;
    protected $queryService;

    public function __construct(ProjectService $projectService, WorkspaceService $workspaceService, QueryService $queryService)
    {
        $this->workspaceService = $workspaceService;
        $this->projectService = $projectService;
        $this->queryService = $queryService;
    }

    public function index(Request $request, Workspace $workspace)
    {
        $query = Project::query()->where('workspace_id', $workspace->id)->where('status', '!=', 'Удалён');

        $currentUser = $request->user();
        $currentUserId = $currentUser->id;
        $currentUserRole = $this->workspaceService->getUserRoleInWorkspace($workspace, $currentUserId);

        if (!in_array($currentUserRole, ['owner','admin'], true)) {
            $query->whereHas('users', function($q) use ($currentUserId) {
                $q->where('user_id', $currentUserId);
            });
        }

        // $filters = $request->input('filters', '');
        // $columns = $request->input('columns', '*');
        // $perPage = $request->input('per_page', false);

        $projects = $query->get();
        // $query = $this->queryService->applyFilters($query, $filters);
        // $query = $this->queryService->selectColumns($query, $columns);

        // $projects = $this->queryService->paginateResults($query, $perPage);

        foreach($projects as $project){
            $project->tasks = $project->tasks;
        }

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
        $users = $project->users()->get();


        $users->transform(function($user) use($project) {
            $user->pivot->role = $this->workspaceService->getUserRoleInWorkspace($project->workspace, $user->id);

            $user->tasks = $user->tasks()
            ->where('project_id', $project->id)
            ->select(['tasks.id', 'tasks.title', 'tasks.status', 'tasks.project_id', 'tasks.start_date', 'tasks.end_date'])
            ->get();

            return $user;
        });

        return response()->json($users);
    }

    // Глобальный поиск по проекту
    public function projectsTasks(Request $request)
    {
        $q = $request->input('query', null);

        if ($q === null) {
            return response()->noContent();
        }

        $userId = $request->user()->id;

        // $role = $this->workspaceService->getUserRoleInWorkspace($workspace, $userId);

        $workspaces = Workspace::whereHas('users', fn($u) =>
                $u->where('user_id', $userId)
            )->where(function ($wsQuery) use ($q) {
                // $wsQuery->where('title', 'like', "%{$q}%")->orWhereHas('projects', function ($prQuery) use ($q) {
                // $prQuery->where('title', 'like', "%{$q}%")->orWhereHas('tasks', function ($tkQuery) use ($q) {
                //         $tkQuery->where('title', 'like', "%{$q}%");
                // });
                // })->orWhereHas('projects.tasks', function ($tkQuery) use ($q) {
                //     $tkQuery->where('title', 'like', "%{$q}%");
                // });
                $wsQuery->where('title', 'like', "%{$q}%")
                ->orWhereHas('projects', function ($prQuery) use ($q) {
                    $prQuery->where('status', '!=', 'Удален')
                            ->where(function ($sub) use ($q) {
                                $sub->where('title', 'like', "%{$q}%")
                                    ->orWhereHas('tasks', fn($tkQuery) =>
                                        $tkQuery->where('title', 'like', "%{$q}%")
                                    );
                            });
                })
                ->orWhereHas('projects.tasks', fn($tkQuery) =>
                    $tkQuery->where('title', 'like', "%{$q}%")
                            ->whereHas('project', fn($p) =>
                                $p->where('status', '!=', 'Удалён')
                            )
                    );
        })->with([
            // 'users',
            // 'projects.users',
            'projects' => function ($prQuery) use ($q, $userId) {
                $prQuery->where('status', '!=', 'Удалён')->where('title', 'like', "%{$q}%")->orWhereHas('tasks', function ($tkQuery) use ($q) {
                    $tkQuery->where('title', 'like', "%{$q}%");
                });
                // if (!in_array($role, ['owner','admin'], true)) {
                //     $pr->whereHas('users', fn($u)=>
                //         $u->where('user_id', $userId)
                //     );
                // }
            },
            'projects.tasks' => function ($tkQuery) use ($q) {
                $tkQuery->where('title', 'like', "%{$q}%")
                        ->whereHas('project', fn($p) =>
                            $p->where('status', '!=', 'Удалён')
                        );
            },
        ])->get();

        if ($workspaces->isEmpty()) {
            return response()->noContent();
        }

        // $workspaces->transform(fn($ws)=> tap($ws, function($w) use($userId) {
        //     // dd($w->users);
        //     $role = $this->workspaceService->getUserRoleInWorkspace($w, $userId);

        //     if (!in_array($role, ['owner','admin'], true)) {
        //         $w->projects = $w->projects->filter(fn($pr) =>
        //             $pr->users->contains(fn($u) => $u->id === $userId)
        //         )->values();
        //     }
        // }));
        // $workspaces->each(function($ws) use($userId) {
        //     $role = $this->workspaceService->getUserRoleInWorkspace($ws, $userId);
        //     if (! in_array($role, ['owner','admin'], true)) {
        //         $ws->projects = $ws->projects->whereUser($userId)->values();
        //     }
        // });

        return response()->json($workspaces);
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

        $project = $this->projectService->updateProject($project, $validated);

        return response()->json($project, 200);
    }

    public function destroy(Project $project)
    {
        $this->projectService->deleteProject($project);

        return response()->json($project, 200);
    }

    public function assignUserToProject(Request $request, Project $project)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $userId = $validated['user_id'];

        if ($project->users()->where('user_id', $userId)->exists()) {
            return response()->json([
                'message' => 'Пользователь уже назначен на этот проект'
            ], 409);
        }

        $workspaceRole = $this->workspaceService->getUserRoleInWorkspace($project->workspace, $userId);

        if (!in_array($workspaceRole, ['executor','project_manager'], true)) {
            return response()->json([
                'message' => 'Вы не можете назначить этого пользователя в проект'
            ], 403);
        }

        $this->projectService->assignUser($project, $request->user_id);

        $user = $project->users()->where('user_id', $userId)->firstOrFail();

        $user->pivot->role = $workspaceRole;

        return response()->json([
            'message' => 'Пользователь успешно назначен на проект',
            'user' => $user,
        ], 200);
    }

    public function kickUserFromProject(Request $request, Project $project)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $userId = $validated['user_id'];

        $user = User::findOrFail($userId);

        $this->projectService->deleteUserFromProject($project, $request->user_id);


        return response()->json([
            'message' => 'Пользователь успешно отстранен',
            'user' => $user,
        ], 200);
    }

    public function LeaveProject(Request $request, Project $project)
    {
        $this->projectService->deleteUserFromProject($project, $request->user()->id);

        return response()->json(['message' => 'Вы вышли из проекта'], 200);
    }

    public function projectsStats(Workspace $workspace)
    {
        $startDate = Carbon::now()->subDays(6)->startOfDay();

        $projects = $workspace
            ->projects()
            ->where('created_at', '>=', $startDate)
            ->get();

        $byDate = $projects->groupBy(function (Project $project) {
            return $project->created_at->format('Y-m-d');
        });

        $stats = collect();

        foreach ($byDate as $date => $projectsOnDate) {
            $stats->push([
                'date'         => $date,
                'Созданные'    => $projectsOnDate->where('status', 'Создан')->count(),
                'В процессе'   => $projectsOnDate->where('status', 'В процессе')->count(),
                'Завершенные'  => $projectsOnDate->where('status', 'Завершён')->count(),
            ]);
        }

        $stats = $stats->sortBy('date')->values();

        return response()->json($stats);
    }
}
