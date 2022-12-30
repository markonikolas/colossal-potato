# Blog app

## Prerequisite

You will need to install Docker, docker-compose & node in order to run this project

## Starting the project

### Set env variales

Add env variables in root of the project so docker can set the database correctly

```bash
MYSQL_DATABASE=blog
MYSQL_USER=username
MYSQL_PASSWORD=password
MYSQL_HOST=db
MYSQL_ROOT_PASSWORD=rootpassword
```

Add env variable DATABASE_URL in the prisma folder so prisma could connect

```bash
touch src/api/src/prisma/.env
```

Add env in this format

```bash
DATABASE_URL=mysql://username:password@db:3306/blog
```

### Docker

Build the images

```bash
docker-compose build
```

Generate prisma dependencies

```bash
cd src/api/src
npm run prisma-generate
```

Start the project

```bash
docker-compose up
```

In this project four services communicate with each other: client, api, phpmyadmin and the database.

client -> [localhost:3000](localhost:3000) api -> [localhost:5000](localhost:5000) phpmyadmin -> [localhost:8000](localhost:8000) db -> localhost:3306

API has some routes you should know about:

Home: / Get posts: /posts
