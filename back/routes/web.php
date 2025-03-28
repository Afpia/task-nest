<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return ['Laravel' => app()->version()];
// });

Route::get('/login', function () {
    return response()->json(['message' => 'не верный токен авторизации'], 401);
});

Route::view('/', 'welcome');

require __DIR__ . '/auth.php';
