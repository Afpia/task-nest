<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\QueryService;
use Illuminate\Http\Request;

class UserController extends Controller
{

    protected $queryService;

    public function __construct(QueryService $queryService)
    {
        $this->queryService = $queryService;
    }

    public function index()
    {
        $users = User::all();

        return response()->json($users);
    }

    public function view(Request $request, User $user)
    {

        $columns = $request->input('columns', '*');
        $user = $this->queryService->selectColumns($user->newQuery(), $columns)->find($user->id);
        return response()->json($user);
    }

    public function profile(Request $request)
    {
        $user = auth()->user();

        $columns = $request->input('columns', '*');
        $user = $this->queryService->selectColumns($user->newQuery(), $columns)->find($user->id);

        return response()->json($user);
    }

    public function avatar()
    {
        $user = auth()->user();
        return response()->json([
            'avatar' => $user->avatar_url
        ]);
    }

    public function workspaces()
    {
        $user = auth()->user();

        $workspaces = $user->workspaces;

        return response()->json($workspaces);
    }

    public function search()
    {
        //
    }
}