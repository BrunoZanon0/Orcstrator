<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestController extends Controller
{
    public function test(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'API is working!'
        ]);
    }
    
    public function register(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Test register works!'
        ]);
    }
}
