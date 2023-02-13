const { PrismaClient } = require('./index.js');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();
const postsTable = prisma.post;
const usersTable = prisma.user;

class User {
    public username: string;
    public email: string;
    public role: string;

    constructor(username: string, email: string, role: string) {
        this.username = username;
        this.email = email;
        this.role = role;
    }
}

class Post {
    public title: string;
    public content: string;
    public img: string;
    public author_id: number;

    constructor(title: string, content: string, img: string, author_id: number) {
        this.title = title;
        this.content = content;
        this.img = img;
        this.author_id = author_id;
    }
}

const seedMany = (table: any) => async (data: any) => await table.createMany({
    data
});

const generateUsers = (count: number) => {
    const { userName, email } = faker.internet;
    const role = 'subscriber';

    let users = [];

    for (let index = 0; index < count; index++) {
        users.push(new User(userName().toLowerCase(), email(), role));
    }

    if (users.length === 1) {
        return users[0]
    }

    return users;
}

const generatePosts = (count: number) => {
    const { sentence, paragraph } = faker.lorem;
    const { city } = faker.image;

    let posts = [];

    for (let index = 0; index < count; index++) {
        posts.push(new Post(sentence(), paragraph(), city(640, 480, true), 1));
    }

    if (posts.length === 1) {
        return posts[0]
    }

    return posts;
}

const users = generateUsers(10);
const posts = generatePosts(10);

const createPosts = seedMany(postsTable);
const createUsers = seedMany(usersTable);

const catchErr = (e: Error) => console.error(e);
const disconnect = () => prisma.$disconnect();

createPosts(posts).catch(catchErr).finally(disconnect);
createUsers(users).catch(catchErr).finally(disconnect);