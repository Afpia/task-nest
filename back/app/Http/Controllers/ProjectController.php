<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    private const PROJECT_VALIDATOR = [
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'status' => 'required|in:Создан,В процессе,Завершён',
        'user_id' => 'required|exists:users,id'
    ];

    public function index()
    {
        $projects = Project::all();

        return response()->json($projects);
    }

    public function view(Project $project)
    {
        return response()->json($project);
    }

    public function userProjects(Request $request)
    {
        $user = $request->user();

        $projects = $user->role === 'Исполнитель'
            ? Project::whereHas('tasks', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->get()
            : $user->managedProjects;

        return response()->json($projects);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(self::PROJECT_VALIDATOR);

        $endDate = Carbon::parse($request->end_date);
        $remainingDays = $endDate->diffInDays(Carbon::now(), 1) + 1;



        $project = Project::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'status' => $validated['status'],
            'remaining_days' => $remainingDays,
            'user_id' => $validated['user_id']
        ]);

        return response()->json($project, 201);
    }
}
