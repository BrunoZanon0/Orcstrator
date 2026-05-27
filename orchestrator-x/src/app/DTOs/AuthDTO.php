<?php

namespace App\DTOs;

class AuthDTO
{
    public function __construct(
        public readonly ?string $name,
        public readonly string $email,
        public readonly string $password,
        public readonly ?string $cpfCnpj = null,
        public readonly ?string $phone = null,
        public readonly ?string $mobilePhone = null,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'] ?? null,
            email: $data['email'],
            password: $data['password'],
            cpfCnpj: $data['cpf_cnpj'] ?? null,
            phone: $data['phone'] ?? null,
            mobilePhone: $data['mobile_phone'] ?? null,
        );
    }

    public function toArray(): array
    {
        return array_filter([
            'name' => $this->name,
            'email' => $this->email,
            'password' => bcrypt($this->password),
            'cpf_cnpj' => $this->cpfCnpj,
            'phone' => $this->phone,
            'mobile_phone' => $this->mobilePhone,
        ]);
    }
}
