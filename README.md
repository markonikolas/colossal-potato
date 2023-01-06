# Blog app

## Prerequisite

You will need to install Docker, docker-compose / Docker Compose plugin & node in order to run this project

## Starting the project

### Set env variales

Add env variables in root of the project so docker can set the database correctly

```bash
MYSQL_DATABASE=blog
MYSQL_USER=blog
MYSQL_PASSWORD=blog
MYSQL_HOST=localhost
MYSQL_ROOT_PASSWORD=blogroot

DATABASE_URL=mysql://blog:blog@localhost:3306/blog

REDIS_HOST=redis 
REDIS_PASSWORD=redis
REDIS_PORT=6379

JWT_ACCESS_TOKEN_SECRET='generated password'
JWT_REFRESH_TOKEN_SECRET='generated password'
```

### Docker

Start the project

```bash
docker-compose up --build
```

or

```bash
docker compose up --build
```

Next, you'll need to sync schema with db container

```bash
docker compose exec api /bin/sh
```

then inside the api container

```bash
pnpm run db:push # sync the schema

pnpm run db:seed # seed the database
```

In this project four services communicate with each other: client, api, rest and the database.
Also, there is prisma studio container.

client -> [localhost:3000](localhost:3000)
api -> [localhost:5000](localhost:5000)
prisma-studio -> [localhost:5555](localhost:5555)
redis -> localhost:6379
db -> localhost:3306
