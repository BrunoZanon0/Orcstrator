<?php

namespace App\Contracts;

use App\DTOs\AuthDTO;
use App\Models\User;

interface UserRepositoryInterface
{
    public function create(AuthDTO $dto): User;
    public function findByEmail(string $email): ?User;
    public function findByCpfCnpj(string $cpfCnpj): ?User;
    public function updateJwtToken(User $user, string $token): bool;
    public function softDelete(User $user): bool;
}
