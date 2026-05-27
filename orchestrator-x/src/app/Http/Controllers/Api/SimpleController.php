<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SimpleController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Simple controller works!'
        ]);
    }
}
