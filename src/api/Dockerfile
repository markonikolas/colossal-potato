FROM node:lts-slim as api

WORKDIR /api

COPY --chown=1000:1000 . .

COPY --chown=1000:1000 package.json package-lock.json ./

RUN apt update && \
    apt install build-essential -y

RUN npm i --location=global nodemon

RUN npm ci

EXPOSE 5000

ENTRYPOINT [ "npm", "run", "dev" ]

FROM node:lts-slim as prisma

WORKDIR /api/src/

COPY --chown=1000:1000 ./src/prisma .

RUN apt update && \
    apt install build-essential -y

EXPOSE 5555

RUN ["npm", "init", "-y"]

ENTRYPOINT ["npx", "prisma", "studio"]