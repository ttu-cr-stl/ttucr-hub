"use server";
import prisma from "@/db/prisma";

export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
  });

  return user;
}