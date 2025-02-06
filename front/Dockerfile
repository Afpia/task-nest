FROM node:22-alpine AS base
RUN npm install -g bun
WORKDIR /app

FROM base AS client-base
COPY package.json bun.lockb ./
RUN bun install
COPY ./ ./
EXPOSE 5173

FROM client-base AS client-dev
CMD ["bun", "dev"]