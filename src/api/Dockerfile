FROM node:alpine as api

WORKDIR /api

COPY . .

RUN apk --no-cache add curl

RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

RUN ["pnpm", "install"]

EXPOSE 5000

ENTRYPOINT [ "pnpm", "run", "dev" ]

FROM node:alpine as prisma

WORKDIR /prisma

COPY /src/prisma .

RUN apk add --no-cache libc6-compat openssl curl

RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

EXPOSE 5555

ENTRYPOINT ["pnpm", "dlx", "prisma", "studio"]