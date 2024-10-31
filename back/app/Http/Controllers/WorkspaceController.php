<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;

class WorkspaceController extends Controller
{
    public function index()
    {
        $workspaces = Workspace::all();
        return response()->json($workspaces);
    }

    public function show(Workspace $workspace)
    {
        return response()->json($workspace);
    }
}
