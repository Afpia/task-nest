<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\PersonalAccessToken;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/accessUser', [AuthController::class, 'checkToken']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('auth/{provider}/redirect', [AuthController::class, 'redirectToProvider']);
Route::get('auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/project/add', [ProjectController::class, 'store']);
    Route::get('/project/{project}', [ProjectController::class, 'show']);
    Route::get('/user/projects', [ProjectController::class, 'userProjects']);
    Route::get('/project/{project}/users', [ProjectController::class, 'projectUsers']);
    Route::put('/project/{project}/update', [ProjectController::class, 'update']);
    Route::delete('/project/{project}/delete', [ProjectController::class, 'destroy']);

    Route::get('/task/{task}', [TaskController::class, 'view']);
});


