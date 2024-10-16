<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PersonalAccessTokenController;
use App\Http\Controllers\ProjectController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\PersonalAccessToken;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/personal-access-tokens', [PersonalAccessTokenController::class, 'store']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('auth/{provider}/redirect', [AuthController::class, 'redirectToProvider']);
Route::get('auth/{provider}/callback', [AuthController::class, 'handleProviderCallback']);

Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/project/{project}', [ProjectController::class, 'view']);
Route::get('/user/{user}/projects', [ProjectController::class, 'userProjects']);
Route::post('/project/add', [ProjectController::class, 'store']);
Route::put('/project/update', [ProjectController::class, 'update']);



