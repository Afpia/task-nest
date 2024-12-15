FROM node:22 AS base
RUN npm install -g pnpm
WORKDIR /app

FROM base AS client-base
COPY package.json pnpm-lock.yaml .
RUN pnpm install
COPY eslint.config.js index.html vite.config.ts stylelint.config.js tsconfig.json tsconfig.app.json tsconfig.node.json .gitignore .
COPY public public
COPY src src
EXPOSE 5173

FROM client-base AS client-dev
# CMD ["pnpm", "install"]
CMD ["pnpm", "dev", "--host"]