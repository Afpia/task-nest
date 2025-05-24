<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Workspace;
use App\Services\QueryService;
use App\Services\TaskService;
use Illuminate\Support\Carbon;
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
        // $filters = $request->input('filters', '');
        // $columns = $request->input('columns', '*');
        // $perPage = $request->input('per_page', false);
        Task::where('project_id', $project->id)
        ->whereDate('end_date', '<', Carbon::now())
        ->whereNotIn('status', ['Просрочена', 'Выполнена', 'Приостановлена'])
        ->update(['status' => 'Просрочена']);

        $tasks = Task::where('project_id', $project->id)->with(['users','files'])->get();
        // $query = $this->queryService->applyFilters($query, $filters);
        // $query = $this->queryService->selectColumns($query, $columns);
        // $tasks = $this->queryService->paginateResults($query, $perPage);

        // foreach($tasks as $task){
        //     $task->users()->sync($task->users->pluck('id'));
        // }

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
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date'  => 'required|date',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'assignees'   => 'required|array|min:1',
            'assignees.*' => 'integer|exists:users,id',
            'files'       => 'sometimes|array',
            'files.*'     => 'file|max:10240',
        ]);

        $task = $this->taskService->createTask($validate, $project);

        $task->load(['users', 'files']);

        if ($project->tasks()->count() >= 1 && $project->status !== 'В процессе') {
            $project->status = 'В процессе';
            $project->save();
        }

        return response()->json($task, 201);
    }

    public function update(Request $request, Task $task)
    {
        $validate = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'remove_files' => 'sometimes|array',
            'end_date'    => 'nullable|date|after_or_equal:start_date',
            'assignees'   => 'required|array|min:1',
            'assignees.*' => 'integer|exists:users,id',
            'files'       => 'sometimes|array',
            'files.*'     => 'file|max:10240',
        ]);

        $newEnd = Carbon::parse($validate['end_date']);

        if ($newEnd->greaterThanOrEqualTo(Carbon::now())) {
            $validate['status'] = 'Выполняется';
        }

        $task = $this->taskService->updateTask($validate, $task);

        $task->load(['users', 'files']);

        return response()->json($task, 200);
    }

    public function destroy(Task $task)
    {
        $task->users()->detach();

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
            'status' => 'required|in:Назначена,Выполняется,Завершена,Просрочена,Приостановлена'
        ]);

        $this->taskService->updateTask($validate, $task);

        return response()->json(['message' => __('messages.update_status_success'), 'status' => $task->status], 200);
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