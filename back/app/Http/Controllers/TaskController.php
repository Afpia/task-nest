<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Project $project)
    {
        //
    }

    public function view(Task $task)
    {
        return response()->json($task);
    }
    public function store(Request $request)
    {
        //
    }
}