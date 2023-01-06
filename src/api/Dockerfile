FROM node:alpine as api

WORKDIR /api

COPY package.json pnpm-lock.yaml ./

RUN apk --no-cache add curl

RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

COPY package.json pnpm-lock.yaml ./

RUN pnpm install && pnpm store prune 

EXPOSE 5000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["pnpm", "run", "dev"]

FROM node:alpine as prisma

RUN apk --no-cache add curl

WORKDIR /prisma

COPY /src/prisma/schema.prisma .

RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

EXPOSE 5555

CMD ["pnpm", "dlx", "prisma", "studio"]
