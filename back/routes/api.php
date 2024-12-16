<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
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
    Route::post('/workspace/add', [WorkspaceController::class, 'store']);

    //user
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/user/info', [UserController::class, 'profile']);
    Route::get('/user/info/avatar', [UserController::class, 'avatar']);
    Route::get('/user/workspaces', [UserController::class, 'workspaces']);

    Route::get('/user/{user}', [UserController::class, 'view']);

    Route::get('/search', [UserController::class, 'search']);



    //executor 
    Route::middleware('role:executor')->group(function () {
        //workspaces routes
        Route::get('/workspace/{workspace}', [WorkspaceController::class, 'show']);
        Route::get('/workspace/{workspace}/users', [WorkspaceController::class, 'workspaceUsers']);
        Route::get('/workspace/{workspace}/stats', [WorkspaceController::class, 'workspaceStats']);//нужны поля
        Route::get('/workspace/{workspace}/role', [WorkspaceController::class, 'getUserRole']);
        Route::delete('workspace/{workspace}/leave', [WorkspaceController::class, 'leaveWorkspace']);

        //projects routes
        Route::get('/projects/{workspace}', [ProjectController::class, 'index']);
        Route::get('/project/{project}', [ProjectController::class, 'show']);
        Route::get('/project/{project}/users', [ProjectController::class, 'projectUsers']);//после тасков

        //tasks routes
        Route::get('/my-tasks/{workspace}', [TaskController::class, 'myTasksInWorkspace']);
        Route::get('/my-tasks/{project}/project', [TaskController::class, 'myTasksInProject']);
        Route::get('/task/{task}', [TaskController::class, 'view']);
        Route::get('/task/{task}/users', [TaskController::class, 'taskUsers']);
        Route::put('/task/{task}/update-status', [TaskController::class, 'updateStatus']);

        //comments routes
        Route::get('/comment/{task}', [CommentController::class, 'index']);
        Route::post('/comment/{task}', [CommentController::class, 'store']);
    });

    //project manager
    Route::middleware('role:project_manager')->group(function () {
        //project routes
        Route::post('/project/{project}/leave', [ProjectController::class, 'leaveProject']);

        //task routes
        Route::get('/tasks/{project}', [TaskController::class, 'index']);
        Route::post('/task/{project}/add', [TaskController::class, 'store']);
        Route::post('/task/{task}/add-user', [TaskController::class, 'addUserToTask']);
        Route::put('/task/{task}/update', [TaskController::class, 'update']);
        Route::delete('/task/{task}/delete', [TaskController::class, 'destroy']);
    });

    //admin
    Route::middleware('role:admin')->group(function () {
        //workspaces routes
        Route::post('/workspace/{workspace}/user-add', [WorkspaceController::class, 'addUserToWorkspace']);
        Route::post('workspace/{workspace}/kick-user', [WorkspaceController::class, 'kickUserFromWorkspace']);
        Route::put('/workspace/{workspace}/manage-user', [WorkspaceController::class, 'manageUserInWorkspace']);

        //projects routes
        Route::post('/project/{workspace}/add', [ProjectController::class, 'store']);
        Route::post('/project/{project}/add-manager', [ProjectController::class, 'assignProjectManager']);
        Route::post('/project/{project}/kick-manager', [ProjectController::class, 'kickProjectManager']);
        Route::put('/project/{project}/update', [ProjectController::class, 'update']);
        Route::delete('/project/{project}/delete', [ProjectController::class, 'destroy']);
    });

    //owner
    Route::middleware('role:owner')->group(function () {
        //workspaces routes
        Route::put('/workspace/{workspace}/update', [WorkspaceController::class, 'update']);
        Route::delete('/workspace/{workspace}/delete', [WorkspaceController::class, 'destroy']);
    });

    Route::get('requests', [PersonalAccessTokenController::class, 'index']);
    Route::post('request/{user}', [PersonalAccessTokenController::class, 'store']);
    Route::post('request{request}/accept', [PersonalAccessTokenController::class, 'accept']);
    Route::post('request{request}/desline', [PersonalAccessTokenController::class, 'desline']);

});


