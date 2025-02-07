FROM node:23-alpine AS base
WORKDIR /app

# Копируем package.json и yarn.lock
COPY package.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы проекта
# COPY eslint.config.js index.html vite.config.ts prettier.config.js tsconfig.json tsconfig.app.json tsconfig.node.json ./
# COPY public public
# COPY src src
COPY . .

EXPOSE 5173

FROM base AS client-dev

# Запуск приложения
CMD ["npm", "run", "dev", "--host"]
