<?php

namespace App\Services;

use App\Models\DisposableToken;
use App\Models\User;
use Hash;
use Str;

class TokenService
{
    public function generateDisposableToken($userId)
    {
        $token = Str::random(32);
        DisposableToken::create([
            'user_id' => $userId,
            'token' => Hash::make($token),
        ]);
        return $token;
    }

    public function checkDisposableToken($token)
    {
        $disposableToken = DisposableToken::where('token', $token)->first();

        if ($disposableToken && Hash::check($token, $disposableToken->token)) {
            $user = User::where('id', $disposableToken->user_id)->first();
            $disposableToken->delete();
            $newToken = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['access_token' => $newToken, 'user' => $user], 200);
        }

        return response()->json(['message' => 'Токен устарел'], 401);
    }
}
