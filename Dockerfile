FROM node:20-alpine
FROM oven/bun:latest AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN bun install

RUN bun run build

COPY . .

EXPOSE 8080

CMD ["bun", "dev"]