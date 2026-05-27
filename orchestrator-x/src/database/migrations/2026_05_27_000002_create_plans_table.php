<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->decimal('price_monthly', 10, 2);
            $table->decimal('price_yearly', 10, 2);
            $table->integer('requests_per_minute')->default(60);
            $table->integer('max_routes')->default(10);
            $table->integer('max_api_keys')->default(5);
            $table->integer('max_users')->default(5);
            $table->integer('log_retention_days')->default(7);
            $table->json('features')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('tier')->default(0); // 0=Free, 1=Pro, 2=Enterprise
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
