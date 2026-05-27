<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Free',
            'slug' => 'free',
            'description' => 'Perfect for startups and small projects',
            'price_monthly' => 0,
            'price_yearly' => 0,
            'requests_per_minute' => 60,
            'max_routes' => 5,
            'max_api_keys' => 3,
            'max_users' => 3,
            'log_retention_days' => 7,
            'features' => json_encode([
                'api_gateway',
                'basic_analytics',
                'email_support'
            ]),
            'tier' => 0
        ]);

        Plan::create([
            'name' => 'Pro',
            'slug' => 'pro',
            'description' => 'For growing businesses',
            'price_monthly' => 49,
            'price_yearly' => 490,
            'requests_per_minute' => 600,
            'max_routes' => 50,
            'max_api_keys' => 20,
            'max_users' => 20,
            'log_retention_days' => 30,
            'features' => json_encode([
                'api_gateway',
                'advanced_analytics',
                'priority_support',
                'webhooks',
                'rate_limiting',
                'custom_domains'
            ]),
            'tier' => 1
        ]);

        Plan::create([
            'name' => 'Enterprise',
            'slug' => 'enterprise',
            'description' => 'For large organizations',
            'price_monthly' => 299,
            'price_yearly' => 2990,
            'requests_per_minute' => 10000,
            'max_routes' => 1000,
            'max_api_keys' => 100,
            'max_users' => 100,
            'log_retention_days' => 90,
            'features' => json_encode([
                'api_gateway',
                'advanced_analytics',
                '24/7_support',
                'webhooks',
                'rate_limiting',
                'custom_domains',
                'sla_guarantee',
                'dedicated_support',
                'on_premise'
            ]),
            'tier' => 2
        ]);
    }
}
