<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Str;

class AuthController extends Controller
{
    private $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function handleProviderCallback($provider)
    {
        $token = $this->authService->handleSocialCallback($provider);
        return redirect("http://localhost:5173/login?access_token=$token");
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            $token = $this->authService->login($credentials);
            return response()->json(['access_token' => $token, 'user' => auth()->user()]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }

    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:3',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $user = $this->authService->register($validated);
        return response()->json([
            'access_token' => $user['access_token'],
            'user' => $user['user'],
        ], 201);
    }

    public function checkToken(Request $request)
    {
        $token = $request->input('accessToken');

        return $this->checkDisposableToken($token);
    }
}

