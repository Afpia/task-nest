<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $rules = [
            'name' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'avatar_url' => ['sometimes', 'file', 'max:2048'],
            // 'password' => ['sometimes','string','min:8'],
            // 'current_password' => ['sometimes', 'string', 'min:8']
        ];

        if ($this->filled('password')) {
            $rules['current_password'] = ['required','string'];
            $rules['password']         = ['string','min:8'];
        }

        return $rules;
    }
}
