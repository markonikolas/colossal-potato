FROM node:alpine

WORKDIR /client

COPY . .

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install && pnpm store prune 

EXPOSE 3000

ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD [ "npm", "start" ]