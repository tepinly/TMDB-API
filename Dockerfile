FROM node:20-alpine
FROM oven/bun:latest AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "build"]
CMD ["bun", "dev"]