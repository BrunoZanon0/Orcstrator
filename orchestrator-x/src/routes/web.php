<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/auth/register', function() {
    return response()->json(['message' => 'Test route working']);
});

use App\Http\Controllers\Api\AuthController;

Route::post('/api/auth/register', [AuthController::class, 'register']);
Route::post('/api/auth/login', [AuthController::class, 'login']);
Route::post('/api/auth/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::get('/api/auth/me', [AuthController::class, 'me'])->middleware('auth:api');
