<?php

namespace App\Http\Controllers;

use App\Models\DisposableToken;
use App\Models\User;
use Dotenv\Exception\ValidationException;
use Hash;
use Illuminate\Http\Request;
use Str;

class PersonalAccessTokenController extends Controller
{
    public function createToken($user_id)
    {
        $token = Str::random(32);

        DisposableToken::create([
            'user' => $user_id,
            'token' => Hash::make($token)
        ]);

        return $token;
    }

    public function checkToken(Request $request)
    {
        $token = $request->token;
        $users = User::all();

        foreach ($users as $user) {
            if (Hash::check($token, $user->token)) {
                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json(['access_token' => $token, 'user' => $user], 200);
            }
        }

        return response()->json(['message' => 'Токен устарел'], 401);
    }

    public function destroy(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
    }
}
