<?php

use App\Http\Controllers\API\MessageController;
use App\Http\Controllers\API\RoomController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);


Route::apiResource('/rooms',RoomController::class);
Route::apiResource('/messages',MessageController::class);
