<?php

namespace App\Services\Auth;

use RuntimeException;
use App\Services\Auth\AuthProviderInterface;
use App\Models\User;

class GoogleAuthProvider implements AuthProviderInterface
{
    /**
     * Authenticate user
     *
     * @param array $data valid request params
     *
     * @return string token
     */
    public function register(array $data) : string
    {
        throw new RuntimeException("Not implemented");
    }

    /**
     * Register user
     *
     * @param array $data valid request params
     *
     * @return string token
     */
    public function login(array $data) : string
    {
        throw new RuntimeException("Not implemented");
    }
}
