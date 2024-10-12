<?php

namespace App\Http\Controllers;

use App\Models\User;
use Dotenv\Exception\ValidationException;
use Hash;
use Illuminate\Http\Request;

class PersonalAccessTokenController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return json_encode('неверныый логин или пароль');
        }

        return ['token' => $user->createToken($request->email)->plainTextToken];

    }
}
