<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'subscriptions';

    protected $fillable = [
        'company_id', 'plan_id', 'status', 'starts_at', 'ends_at',
        'cancelled_at', 'payment_method', 'payment_id'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'cancelled_at' => 'datetime'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
    
    protected $fillable = [
        'company_id', 'plan_id', 'status', 'starts_at', 'ends_at',
        'cancelled_at', 'payment_method', 'payment_id', 'stripe_id'
    ];
