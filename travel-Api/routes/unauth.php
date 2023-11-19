<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. Thesep
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/





Route::post('/login',[AuthController::class,'userLogin']);



        Route::post('/logout',[AuthController::class,'destroy']);




Route::post('/register',[AuthController::class,'registerUser']);
