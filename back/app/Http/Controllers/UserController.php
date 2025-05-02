<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\QueryService;
use Illuminate\Http\Request;
use App\Services\ImageService;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Support\Facades\Hash;

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

    public function updateProfile(ProfileUpdateRequest $request, ImageService $images)
    {
        $user = $request->user();
        $data = $request->validated();

        if ($request->hasFile('avatar_url')) {
            $path = $images->saveImage('avatar', $request->file('avatar_url'));
            $user->avatar_url = $path;
            $user->save();
        } else if(isset($data['password'])) {
            if (!Hash::check($data['current_password'], $user->password)) {
                return response()->json([
                    'message' => 'Текущий пароль неверен'
                ], 422);
            }
            $data['password'] = Hash::make($data['password']);
        }

        $user->fill($data);
        $user->save();

        return response()->json($user);
    }

    public function search()
    {
        //
    }
}