<?php

use App\Http\Controllers\AuthController;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return "Hello";
});
