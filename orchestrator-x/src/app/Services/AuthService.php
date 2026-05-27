<?php

namespace App\Services;

use App\Contracts\UserRepositoryInterface;
use App\DTOs\AuthDTO;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Exception;

class AuthService
{
    public function __construct(
        private UserRepositoryInterface $userRepository
    ) {}

    public function register(AuthDTO $dto): array
    {
        // Verificar se email já existe
        if ($this->userRepository->findByEmail($dto->email)) {
            throw new Exception('Email already registered', 409);
        }

        // Verificar CPF/CNPJ se fornecido
        if ($dto->cpfCnpj && $this->userRepository->findByCpfCnpj($dto->cpfCnpj)) {
            throw new Exception('CPF/CNPJ already registered', 409);
        }

        // Criar usuário
        $user = $this->userRepository->create($dto);

        // Gerar token JWT
        $token = JWTAuth::fromUser($user);
        $this->userRepository->updateJwtToken($user, $token);

        return [
            'user' => $user,
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ];
    }

    public function login(string $email, string $password): array
    {
        $user = $this->userRepository->findByEmail($email);

        if (!$user || !Hash::check($password, $user->password)) {
            throw new Exception('Invalid credentials', 401);
        }

        $token = JWTAuth::fromUser($user);
        $this->userRepository->updateJwtToken($user, $token);

        return [
            'user' => $user,
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ];
    }

    public function logout(User $user): void
    {
        $this->userRepository->updateJwtToken($user, null);
        JWTAuth::invalidate(JWTAuth::getToken());
    }

    public function refresh(): array
    {
        $token = JWTAuth::refresh();
        $user = JWTAuth::user();
        $this->userRepository->updateJwtToken($user, $token);

        return [
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60
        ];
    }

    public function me(): User
    {
        return JWTAuth::user();
    }
}
