<?php

namespace App\Services;

use App\Models\User;
use App\Models\DisposableToken;
use Laravel\Socialite\Facades\Socialite;
use App\Services\AvatarService;
use App\Services\TokenService;
use Hash;
use Str;

class AuthService
{
    private $avatarService;
    private $tokenService;

    public function __construct(ImageService $avatarService, TokenService $tokenService)
    {
        $this->avatarService = $avatarService;
        $this->tokenService = $tokenService;
    }

    public function handleSocialCallback($provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->user();

        $user = User::where('email', $socialUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'name' => $socialUser->getName(),
                'email' => $socialUser->getEmail() ?? $socialUser->getNickname(),
            ]);

            $user->avatar_url = $socialUser->getAvatar()
                ? $this->avatarService->saveAvatarFromUrl($socialUser->getAvatar())
                : $this->avatarService->generateDefaultImage('avatar', $user->name);
            $user->save();
        }

        return $this->tokenService->generateDisposableToken($user->id);
    }

    public function register(array $validated)
    {
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'avatar_url' => isset($validated['avatar']) ?
                $this->avatarService->saveImage('avatar', $validated['avatar']) :
                $this->avatarService->generateDefaultImage('avatar', $validated['name']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'access_token' => $token,
            'user' => $user,
        ];
    }

    public function login($credentials)
    {
        if (auth()->attempt($credentials)) {
            return auth()->user()->createToken('auth_token')->plainTextToken;
        }

        throw new \Exception('Invalid credentials');
    }
}
