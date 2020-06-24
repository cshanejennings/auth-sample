<?php

namespace App\Services;

use App\Models\User;

class AuthService
{
    /**
     * Create new user account and return access token
     *
     * @param array $data validated request data
     *
     * @return array
     */
    public function register(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        $user = User::firstOrCreate(['email' => $data['email']], $data);
        $token = auth()->login($user);

        // for real application, need to send email verification
        return $this->authResponse($token);
    }

    /**
     * Login user
     *
     * @param array $data validated request data
     *
     * @return array
     */
    public function login(array $credentials)
    {
        if (! $token = auth()->attempt($credentials)) {
            return [];
        }

        return $this->authResponse($token);
    }

    /**
     * Refresh token
     *
     * @return array
     */
    public function refresh()
    {
        return $this->authResponse(auth()->refresh());
    }

    /**
     * Create auth response data
     */
    protected function authResponse(string $token)
    {
        $user = auth()->user();
        return [
            'id'           => $user->id,
            'first_name'   => $user->first_name,
            'last_name'    => $user->last_name,
            'access_token' => $token,
        ];
    }
}
