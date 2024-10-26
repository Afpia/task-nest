<?php

namespace App\Http\Controllers;

use App\Models\DisposableToken;
use App\Models\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Str;

class AuthController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function handleProviderCallback($provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();

        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            // return redirect('http://localhost:5173/login?error=401');

            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail(),
            ]);
        }
        $token = $this->createToken($user->id);
        // $token = $user->createToken('auth_token')->plainTextToken;

        return redirect("http://localhost:5173/login?access_token=$token");
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['access_token' => $token, 'user' => $user]);
        }

        return response()->json(['message' => 'неверный логин или пароль'], 401);
    }

    private function createToken($user_id)
    {
        $token = Str::random(32);

        DisposableToken::create([
            'user_id' => $user_id,
            'token' => Hash::make($token)
        ]);

        return $token;
    }

    public function checkToken(Request $request)
    {
        $token = $request->data['accessToken'];

        $DisTokens = DisposableToken::all();

        foreach ($DisTokens as $DisToken) {
            if (Hash::check($token, $DisToken->token)) {
                $user = User::where('id', $DisToken->user_id)->first();

                $DisToken->delete();

                $token = $user->createToken('auth_token')->plainTextToken;

                return response()->json(['access_token' => $token, 'user' => $user], 200);
            }
        }

        return response()->json(['message' => 'Токен устарел'], 401);
    }
}
