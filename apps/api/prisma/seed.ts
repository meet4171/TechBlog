import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create tags
    const tagNames = [
        'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'NestJS', 'Express',
        'MongoDB', 'PostgreSQL', 'Prisma', 'TailwindCSS', 'Redux', 'GraphQL',
        'REST API', 'Docker', 'Git', 'GitHub', 'Vercel', 'AWS', 'Firebase', 'DevOps',
        'Web Development', 'Full Stack', 'Frontend', 'Backend',
        'Tutorial', 'Tips', 'Best Practices', 'Performance', 'Security',
        'Beginner', 'Interview Prep', 'Career', 'Tech News', 'Open Source',
        'Productivity', 'Tools', 'Debugging', 'Testing', 'Architecture'
    ];
    const tags = await Promise.all(
        tagNames.map(name =>
            prisma.tag.create({
                data: { name },
            })
        )
    );

    // Create users
    const users = await Promise.all(
        Array.from({ length: 10 }).map(() =>
            prisma.user.create({
                data: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                    bio: faker.lorem.sentence(),
                    avatar: faker.image.avatar(),
                    password: faker.internet.password(),
                },
            })
        )
    );

    // Create posts for each user
    const posts: Awaited<ReturnType<typeof prisma.post.create>>[] = [];
    for (const user of users) {
        for (let i = 0; i < 2; i++) {
            const randomTagSubset = faker.helpers.arrayElements(tags, 2);

            const post = await prisma.post.create({
                data: {
                    slug: faker.lorem.slug(),
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraphs(2),
                    thumbnail: faker.image.url(),
                    published: faker.datatype.boolean(),
                    authorId: user.id,
                    tags: {
                        connect: randomTagSubset.map(tag => ({ id: tag.id })),
                    },
                },
            });
            posts.push(post);
        }
    }

    // Create comments
    for (const post of posts) {
        for (let i = 0; i < 3; i++) {
            const user = faker.helpers.arrayElement(users);
            await prisma.comment.create({
                data: {
                    content: faker.lorem.sentence(),
                    postId: post.id,
                    authorId: user.id,
                },
            });
        }
    }

    // Create likes
    for (const post of posts) {
        const likedUsers = faker.helpers.arrayElements(users, 2);
        for (const user of likedUsers) {
            await prisma.like.create({
                data: {
                    postId: post.id,
                    userId: user.id,
                },
            });
        }
    }

    console.log('✅ Seeding complete!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => { prisma.$disconnect() });
