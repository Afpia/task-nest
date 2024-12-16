# Запуск проект

```bash
docker compose up -d
docker compose exec back php artisan migrate --force
```

# Работа с artisan/tinker

```bash
docker compose exec back php artisan
```
# Работа с composer

```bash
docker compose exec back composer install
```
