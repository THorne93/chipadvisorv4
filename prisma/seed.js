const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('1234', 10);
  for (let i = 0; i < 50; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();



    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        
      },
    });

    console.log(`Created user: ${user.username}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
