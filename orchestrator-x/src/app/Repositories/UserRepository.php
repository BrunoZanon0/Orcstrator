<?php

namespace App\Repositories;

use App\Contracts\UserRepositoryInterface;
use App\DTOs\AuthDTO;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository implements UserRepositoryInterface
{
    public function create(AuthDTO $dto): User
    {
        return DB::transaction(function () use ($dto) {
            return User::create($dto->toArray());
        });
    }

    public function findByEmail(string $email): ?User
    {
        return User::where('email', $email)->first();
    }

    public function findByCpfCnpj(string $cpfCnpj): ?User
    {
        return User::where('cpf_cnpj', $cpfCnpj)->first();
    }

    public function updateJwtToken(User $user, string $token): bool
    {
        return $user->update(['jwt_token' => $token]);
    }

    public function softDelete(User $user): bool
    {
        return $user->delete();
    }
}
