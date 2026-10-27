import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const users = await prisma.user.findMany();

  console.log("Подключение к Neon успешно!");
  console.log("Количество пользователей:", users.length);
}

main()
  .catch((error) => {
    console.error("Ошибка подключения к базе:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });