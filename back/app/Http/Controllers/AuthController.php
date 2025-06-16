<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    private $authService;
    private $tokenService;

    public function __construct(AuthService $authService, TokenService $tokenService)
    {
        $this->authService = $authService;
        $this->tokenService = $tokenService;
    }

    public function redirectToProvider($provider)
    {
        $from = request()->get('from', 'login');

        return Socialite::driver($provider)->with(['state' => $from])->stateless()->redirect();
    }

    public function handleProviderCallback($provider)
    {
        $from = request()->get('state');

        try {
            $token = $this->authService->handleSocialCallback($provider);

            if ($from) {
                if ($from === 'signup') {
                    return redirect("http://localhost:5173/signup?access_token=$token");
                }
                return redirect("http://localhost:5173/login?access_token=$token");
            }

        } catch (\Exception $e) {
            if ($from) {
                if ($from === 'signup') {
                    return redirect("http://localhost:5173/signup");
                }
                return redirect("http://localhost:5173/login");
            }
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$this->authService->userExists($credentials['email'])) {
            return response()->json(['message' => 'Email не найден'], 404);
        }

        if ($this->authService->isDeleted($credentials['email'])) {
            return response()->json(['message' => 'Этот аккаунт удалён'], 403);
        }

        if (!$this->authService->validatePassword($credentials['email'], $credentials['password'])) {
            return response()->json(['message' => 'Неверный пароль'], 401);
        }

        try {
            $token = $this->authService->login($credentials);
            return response()->json(['access_token' => $token, 'user' => auth()->user()]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ошибка аутентификации'], 500);
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

        return $this->tokenService->checkDisposableToken($token);
    }

    public function deleteByEmail(string $email)
    {
        $deleted = $this->authService->deleteCurrentUser($email);

        if (!$deleted) {
            return response()->json(['message' => 'Не удалось удалить пользователя'], 500);
        }

        return response()->json([
            'message' => 'Ваш аккаунт помечен как удалён',
        ], 200);
    }
}

