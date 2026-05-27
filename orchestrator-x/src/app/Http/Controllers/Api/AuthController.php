<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);
        $user->update(['jwt_token' => $token]);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $token = JWTAuth::fromUser($user);
        $user->update(['jwt_token' => $token]);

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'message' => 'User not authenticated'
            ], 401);
        }
        
        return response()->json([
            'user' => $user
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = auth()->user();
        if ($user) {
            $user->update(['jwt_token' => null]);
        }
        JWTAuth::invalidate(JWTAuth::getToken());
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }
}
