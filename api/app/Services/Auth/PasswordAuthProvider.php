<?php

namespace App\Services\Auth;

use RuntimeException;
use App\Services\Auth\AuthProviderInterface;
use App\Models\User;

class PasswordAuthProvider implements AuthProviderInterface
{
    /**
     * Authenticate user
     *
     * @param array $data valid request params
     *
     * @return string
     */
    public function register(array $data) : string
    {
        $data['password'] = bcrypt($data['password']);
        $user = User::firstOrCreate(['email' => $data['email']], $data);
        $token = auth()->login($user);
        return $token;
    }

    /**
     * Register user
     *
     * @param array $data valid request params
     *
     * @return string
     */
    public function login(array $data) : string
    {
        if (! $token = auth()->attempt($data)) {
            return "";
        }

        return $token;
    }
}
