"use server";
import prisma from "@/db/prisma";
import { User } from "@prisma/client";

export async function getAllUsers() {
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserByEmail(email: string) {
  console.log('fetching user by email')
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function createUser(email: string) {
  console.log('creating user')
  const user = await prisma.user.create({
    data: {
      firstName: "",
      lastName: "",
      r_number: "",
      major: "",
      email: email,
    },
  });

  return user;
}

export async function updateUserByEmail(email: string, data: Partial<User>) {
  console.log('updating user by email')
  const user = await prisma.user.update({
    where: {
      email,
    },
    data,
  });

  return user;
}
