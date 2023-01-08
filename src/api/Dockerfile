FROM node:alpine as api

WORKDIR /api

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install && pnpm store prune 

EXPOSE 5000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["pnpm", "run", "dev"]

FROM node:alpine as prisma

RUN apk --no-cache add curl

WORKDIR /prisma

COPY /src/prisma/* .

RUN corepack enable && corepack prepare pnpm@latest --activate

EXPOSE 5555

CMD ["pnpm", "dlx", "prisma", "studio"]
