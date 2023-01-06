FROM node:alpine

WORKDIR /client

COPY . .

RUN apk --no-cache add curl

RUN curl -fsSL "https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64" -o /bin/pnpm; chmod +x /bin/pnpm;

COPY package.json pnpm-lock.yaml ./

RUN pnpm install && pnpm store prune 

EXPOSE 3000

ENTRYPOINT [ "docker-entrypoint.sh" ]

CMD [ "npm", "start" ]