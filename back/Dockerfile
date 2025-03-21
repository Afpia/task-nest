FROM php:8.2-fpm AS back-base
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    && docker-php-ext-install pdo pdo_mysql
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/laravel
# RUN chown -R www-data:www-data /var/www/laravel

# COPY composer.json composer.lock ./
COPY ./ ./
RUN composer install --optimize-autoloader --no-dev

EXPOSE 8000

