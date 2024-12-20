FROM node:22 AS base
RUN npm install -g pnpm
WORKDIR /app

FROM base AS client-base
COPY package.json pnpm-lock.yaml ./
# COPY ../.npmrc ./
RUN pnpm i
COPY eslint.config.js index.html vite.config.ts stylelint.config.js tsconfig.json tsconfig.app.json tsconfig.node.json .gitignore ./
COPY public public
COPY src src
RUN chown -R node:node /app/node_modules

EXPOSE 5173

FROM client-base AS client-dev
# CMD ["pnpm", "install"]
CMD ["pnpm", "dev"]