<?php

namespace App\Services;

use App\Models\User;
use App\Models\DisposableToken;
use Laravel\Socialite\Facades\Socialite;
use App\Services\AvatarService;
use App\Services\TokenService;
use TaylorNetwork\UsernameGenerator\Generator;
use Illuminate\Support\Facades\Hash;
use Str;

class AuthService
{
    private $avatarService;
    private $tokenService;
    private $workspaceService;

    protected function generateUniqueLogin(string $name)
    {
        return Generator::generate($name);
    }

    public function __construct(ImageService $avatarService, TokenService $tokenService, WorkspaceService $workspaceService)
    {
        $this->avatarService = $avatarService;
        $this->tokenService = $tokenService;
        $this->workspaceService = $workspaceService;
    }

    public function handleSocialCallback($provider)
    {
        $socialUser = Socialite::driver($provider)->stateless()->setHttpClient(new \GuzzleHttp\Client(['verify' => false]))->user();

        $user = User::where('email', $socialUser->getEmail())->first();


        if ($user) {
            if ($user->is_deleted) {
                throw new \Exception('This account has been deleted.');
            }

            return $this->tokenService->generateDisposableToken($user->id);
        }

        $user = User::create([
            'name' => $socialUser->getName() ?? $socialUser->getNickname(),
            'email' => $socialUser->getEmail(),
        ]);

        $user->avatar_url = $socialUser->getAvatar()
            ? $this->avatarService->saveAvatarFromUrl($socialUser->getAvatar())
            : $this->avatarService->generateDefaultImage('avatar', $user->name);
        $user->save();

        $this->workspaceService->createWorkspace("$user->name`s Workspace", null, null, $user->id);

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

        $this->workspaceService->createWorkspace("$user->name`s Workspace", null, null, $user->id);
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

    public function userExists(string $email): bool
    {
        return User::where('email', $email)->exists();
    }

    public function isDeleted(string $email): bool
    {
        return User::where('email', $email)
                ->where('is_deleted', true)
                ->exists();
    }

    public function validatePassword(string $email, string $password): bool
    {
        $user = User::where('email', $email)->first();

        if (!$user) {
            return false;
        }

        return Hash::check($password, $user->password);
    }

    public function deleteCurrentUser(string $email): bool
    {
        $user = User::where('email', $email)->first();
        
        $user->is_deleted = true;
        $user->save();

        return true;
    }
}
