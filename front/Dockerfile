FROM node:22 AS base
RUN npm install -g pnpm
RUN apt-get update && apt-get install -y xdg-utils
WORKDIR /app

FROM base AS client-base
COPY package.json pnpm-lock.yaml .
RUN pnpm install
COPY eslint.config.js index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json .gitignore .
COPY public public
COPY src src
EXPOSE 5173

FROM client-base AS client-dev
CMD ["pnpm", "dev", "--host"]