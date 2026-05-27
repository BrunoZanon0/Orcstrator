# docker/php/Dockerfile
FROM php:8.3-fpm-alpine

# Instalar dependências do sistema necessárias para PostgreSQL
RUN apk add --no-cache \
    postgresql-dev \
    libpq \
    git \
    unzip \
    curl \
    nginx \
    supervisor

# Instalar extensões PHP
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    bcmath

# Instalar extensão Redis via pecl
RUN pecl install redis && docker-php-ext-enable redis

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Criar usuário para o Laravel
RUN addgroup -g 1000 -S laravel && \
    adduser -S laravel -G laravel -u 1000

WORKDIR /var/www

USER laravel

CMD ["php-fpm"]