<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Default sanity endpoint (optional).
// If you don't need it, you can remove it later.
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Add your API routes below, for example:
// Route::get('/health', fn () => ['status' => 'ok']);
