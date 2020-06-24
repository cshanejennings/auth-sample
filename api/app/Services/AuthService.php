<?php

namespace App\Services;

use App\Models\User;
use App\Services\Auth\AuthProvider;

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
        $authProvider = AuthProvider::getAuthProvider($data["driver"]);
        $token = $authProvider->register($data);

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
    public function login(array $data)
    {
        $authProvider = AuthProvider::getAuthProvider($data["driver"]);
        $token = $authProvider->register($data);
        if (!$token) {
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
