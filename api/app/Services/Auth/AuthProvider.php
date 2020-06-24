<?php

namespace App\Services\Auth;

use RuntimeException;
use App\Services\Auth\AuthProviderInterface;
use App\Services\Auth\PasswordAuthProvider;
use App\Services\Auth\GoogleAuthProvider;
use App\Services\Auth\FacebookAuthProvider;

class AuthProvider
{
    // Auth service provider
    const NORMAL_PROVIDER   = "normal";
    const GOOGLE_PROVIDER   = "google";
    const FACEBOOK_PROVIDER = "facebook";


    /**
     * Get auth service provider
     *
     * @param string $driver provider type normal|google|facebook
     *
     * @return App\Services\Auth\AuthProviderInterface
     */
    public static function getAuthProvider(string $driver) : AuthProviderInterface
    {
        switch ($driver) {
        case static::NORMAL_PROVIDER:
            return new PasswordAuthProvider();
        case static::GOOGLE_PROVIDER:
            return new GoogleAuthProvider();
        case static::FACEBOOK_PROVIDER:
            return new FacebookAuthProvider();
        default:
            throw new RuntimeException("Unsupported driver");
        }
    }
}
