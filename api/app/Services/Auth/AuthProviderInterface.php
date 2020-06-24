<?php

namespace App\Services\Auth;

use App\Models\User;

interface AuthProviderInterface
{
    /**
     * Authenticate user
     *
     * @param array $data valid request params
     *
     * @return token
     */
    public function register(array $data) : string;

    /**
     * Register user
     *
     * @param array $data valid request params
     *
     * @return token
     */
    public function login(array $data) : string;
}
