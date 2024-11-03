<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
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
        $filters = $request->input('filters', []);
        $columns = $request->input('columns', ['*']);
        $perPage = $request->input('per_page', 10);

        $query = Task::query();
        $query = $this->queryService->applyFilters($query, $filters);
        $query = $this->queryService->selectColumns($query, $columns);
        $tasks = $this->queryService->paginateResults($query, $perPage);

        return response()->json($tasks);
    }

    public function view(Request $request, Task $task)
    {
        $columns = $request->input('columns', ['*']);
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

        $this->taskService->createTask($validate, $project);

        return response()->json([__('messages.add_success')], 201);
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

        $this->taskService->updateTask($validate, $task);

        return response()->json(['message' => __('messages.update_success')], 200);
    }

    public function delete(Task $task)
    {
        $task->delete();

        return response()->json(['message' => __('messages.delete_success')], 200);
    }
}