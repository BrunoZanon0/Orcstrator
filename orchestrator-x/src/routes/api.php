<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CheckoutController;
use App\Http\Controllers\Api\AuthController;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
});

Route::get('/test', [App\Http\Controllers\Api\TestController::class, 'test']);
Route::post('/simple', [App\Http\Controllers\Api\SimpleController::class, 'register']);
Route::post('/test-register', [App\Http\Controllers\Api\TestController::class, 'register']);
Route::post('/simple-register', [App\Http\Controllers\Api\SimpleAuthController::class, 'register']);
Route::post('/test-login', [App\Http\Controllers\Api\TestLoginController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/checkout/create-session', [CheckoutController::class, 'createCheckoutSession']);
});

Route::post('/stripe/webhook', [CheckoutController::class, 'handleWebhook']);
