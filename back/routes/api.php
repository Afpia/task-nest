<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkspaceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\PersonalAccessToken;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/accessUser', [AuthController::class, 'checkToken']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('auth/{provider}/redirect', [AuthController::class, 'redirectToProvider']);
Route::get('auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/workspaces', [WorkspaceController::class, 'index']);
    Route::get('/workspace/{workspace}', [WorkspaceController::class, 'show']);
    Route::post('/workspace/add', [WorkspaceController::class, 'store']);
    Route::put('/workspace/{workspace}/update', [WorkspaceController::class, 'update']);
    Route::delete('/workspace/{workspace}/delete', [WorkspaceController::class, 'destroy']);
    Route::get('/workspace/{workspace}/users', [WorkspaceController::class, 'workspaceUsers']);
    Route::post('/workspace/{workspace}/manage-user', [WorkspaceController::class, 'manageUserInWorkspace']);

    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/project/{project}', [ProjectController::class, 'show']);
    Route::post('/project/add', [ProjectController::class, 'store']);
    Route::get('/user/projects', [ProjectController::class, 'userProjects']);
    Route::get('/project/{project}/users', [ProjectController::class, 'projectUsers']);
    Route::put('/project/{project}/update', [ProjectController::class, 'update']);
    Route::delete('/project/{project}/delete', [ProjectController::class, 'destroy']);
    Route::post('/project/{project}/manage-user', [ProjectController::class, 'manageUserInProject']);

    Route::get('/task/{task}', [TaskController::class, 'view']);
});


