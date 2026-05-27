<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class TestLoginController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        
        if (!Hash::check($password, $user->password)) {
            return response()->json(['error' => 'Wrong password'], 401);
        }
        
        return response()->json([
            'message' => 'Login would work!',
            'user_id' => $user->id,
            'email' => $user->email
        ]);
    }
}
