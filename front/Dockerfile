FROM node:22 AS base
RUN npm install -g bun
RUN apt-get update && apt-get install -y xdg-utils
WORKDIR /app

FROM base AS client-base
COPY package.json bun.lockb ./
RUN bun install
COPY eslint.config.js index.html vite.config.ts prettier.config.js tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY public public
COPY src src
EXPOSE 5173

FROM client-base AS client-dev
CMD ["bun", "dev", "--host"]