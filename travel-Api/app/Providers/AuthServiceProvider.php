<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use Carbon\Carbon;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // if (! $this->app->routesAreCached()) {


        //     // Passport::routes();
            
        // }

        Passport::ignoreRoutes();

        // Middleware `oauth.providers` middleware defined on $routeMiddleware above
        Route::group(['middleware' => 'oauth.providers'], function () {
            Passport::ignoreRoutes(function ($router) {
                return $router->forAccessTokens();
            });
        });

        Passport::personalAccessTokensExpireIn(Carbon::now()->addDays(1));


        Passport::tokensCan([
            'user' => 'User Type',
            'admin' => 'Admin User Type',
        ]);
    }
}
