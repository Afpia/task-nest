<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Workspace;
use App\Services\QueryService;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    private $taskService;
    protected $queryService;

    public function __construct(TaskService $taskService, QueryService $queryService)
    {
        $this->taskService = $taskService;
        $this->queryService = $queryService;
    }

    public function index(Request $request, Project $project)
    {
        $filters = $request->input('filters', '');
        $columns = $request->input('columns', '*');
        $perPage = $request->input('per_page', false);

        $query = Task::where('project_id', $project->id);
        $query = $this->queryService->applyFilters($query, $filters);
        $query = $this->queryService->selectColumns($query, $columns);
        $tasks = $this->queryService->paginateResults($query, $perPage);

        foreach($tasks as $task){
            $task->users()->sync($task->users->pluck('id'));
        }
        
        return response()->json($tasks);
    }

    public function view(Request $request, Task $task)
    {
        $columns = $request->input('columns', '*');
        $task = $this->queryService->selectColumns($task->newQuery(), $columns)->find($task->id);

        return response()->json([
            'task' => $task,
        ]);
    }

    public function store(Request $request, Project $project)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
            'priority' => 'required|in:Низкий,Средний,Высокий',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $task = $this->taskService->createTask($validate, $project);

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $validate = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'date',
            'end_date' => 'date|after_or_equal:start_date',
            'priority' => 'required|in:Низкий,Средний,Высокий',
            'project_id' => 'required|exists:projects,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $task = $this->taskService->updateTask($validate, $task);

        return response()->json($task, 200);
    }

    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json($task, 200);
    }

    public function addUserToTask(Request $request, Task $task)
    {
        $this->taskService->addUserToTask($task, $request->user_id);
        return response()->json([__('messages.add_user_success')], 201);
    }

    public function taskUsers(Task $task)
    {
        $taskWithUsers = $task->load('users');
        $sanitizedUsers = $taskWithUsers->users->map(function ($user) use ($task) {
            $role = $this->taskService->getUserRoleInTask($task, $user->id);
            return [
                'id' => $user->id,
                'name' => $user->name,
                'avatar_url' => $user->avatar_url,
                'role' => $role,
            ];
        });

        return response()->json($sanitizedUsers);
    }

    public function updateStatus(Request $request, Task $task)
    {
        $validate = $request->validate([
            'status' => 'required|in:Назначена,Выполняется,Завершена',
        ]);

        $this->taskService->updateTask($validate, $task);

        return response()->json(['message' => __('messages.update_status_success')], 200);
    }

    public function myTasksInProject(Project $project)
    {
        $tasks = $this->taskService->getMyTasksInProject($project, auth()->user());

        return response()->json($tasks);
    }

    public function myTasksInWorkspace(Request $request, Workspace $workspace)
    {
        $tasks = $this->taskService->getMyTasksInWorkspace($workspace, auth()->user());

        return response()->json($tasks);
    }
}