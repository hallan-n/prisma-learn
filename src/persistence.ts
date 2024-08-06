import { PrismaClient } from "@prisma/client";
import { User } from "./user";

const prisma = new PrismaClient();

export async function createUser({ email, name, password }: User) {
  await prisma.user
    .create({
      data: {
        email,
        name,
        password,
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export async function updateUser({ publicId, email, name, password }: User) {
  await prisma.user
    .updateMany({
      data: { email, name, password },
      where: { public_id: publicId },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
export async function deleteUser(publicId: string) {
  await prisma.user
    .deleteMany({
      where: {
        public_id: publicId,
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

export async function findUserById(id: string) {
  return await prisma.user
    .findFirst({
      where: {
        public_id: id,
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
