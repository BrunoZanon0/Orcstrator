<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'cpf_cnpj' => 'nullable|string|unique:users|max:18',
            'phone' => 'nullable|string|max:15',
            'mobile_phone' => 'nullable|string|max:15',
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'This email is already registered',
            'cpf_cnpj.unique' => 'This CPF/CNPJ is already registered',
            'password.min' => 'Password must be at least 6 characters',
            'password.confirmed' => 'Password confirmation does not match',
        ];
    }
}
