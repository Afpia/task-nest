FROM php:8.2-fpm AS back-base
RUN docker-php-ext-install pdo pdo_mysql
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/laravel

COPY composer.json composer.lock ./
RUN composer install --optimize-autoloader

COPY ./ ./

RUN chown -R www-data:www-data /var/www/laravel

EXPOSE 8000