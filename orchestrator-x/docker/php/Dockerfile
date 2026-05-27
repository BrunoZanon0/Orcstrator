FROM php:8.3-fpm-alpine

# Instalar dependências do sistema (incluindo autoconf para o redis)
RUN apk add --no-cache \
    postgresql-dev \
    libpq \
    autoconf \
    gcc \
    g++ \
    make \
    git \
    unzip \
    curl

# Instalar extensões PHP base
RUN docker-php-ext-install \
    pdo \
    pdo_pgsql \
    bcmath

# Instalar Redis (usando pecl, mas com autoconf já instalado)
RUN pecl install redis && docker-php-ext-enable redis

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Criar usuário não-root
RUN addgroup -g 1000 -S laravel && \
    adduser -S laravel -G laravel -u 1000

USER laravel

CMD ["php-fpm"]
