<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $table = 'plans';
    
    protected $fillable = [
        'name', 'slug', 'description', 'price_monthly', 'price_yearly',
        'requests_per_minute', 'max_routes', 'max_api_keys', 'max_users',
        'log_retention_days', 'features', 'is_active', 'tier'
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean'
    ];
}
