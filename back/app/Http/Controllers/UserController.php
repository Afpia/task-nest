<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\QueryService;
use Illuminate\Http\Request;
use App\Services\ImageService;
use App\Http\Requests\ProfileUpdateRequest;

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

    // public function updateEmail(Request $request)
    // {
    //     $user = $request->user();
    //     $user->email = $request->email;
    //     $user->save();

    //     return response()->json([
    //         // 'message' => 'Email успешно обновлён',
    //         'email' => $user->email
    //     ]);
    // }

    public function updateProfile(ProfileUpdateRequest $request, ImageService $images)
    {
        $user = $request->user();

        dd($request);
        if ($request->hasFile('avatar_url')) {
            $path = $images->saveImage('avatar', $request->file('avatar_url'));
            $user->avatar_url = $path;
        }

        $user->fill($request->validated());
        $user->save();

        return response()->json($user);
    }

    public function search()
    {
        //
    }
}