# Launch of the project

```bash
docker compose up -d
docker compose exec back php artisan migrate --force
```

# Working with artisan/tinker

```bash
docker compose exec back php artisan
```
# Working with composer

```bash
docker compose exec back composer install
```
