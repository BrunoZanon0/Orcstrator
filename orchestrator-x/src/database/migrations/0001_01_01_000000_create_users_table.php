<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('cpf_cnpj')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->string('mobile_phone')->nullable();
            $table->string('jwt_token')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();

            // Índices para performance
            $table->index(['email', 'deleted_at']);
            $table->index(['cpf_cnpj', 'deleted_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
