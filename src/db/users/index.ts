"use server";
import prisma from "@/db/prisma";
import { User } from "@prisma/client";

export async function getAllUsers() {
  console.log("fetching all users");
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserByUsername(username: string) {
  console.log("fetching user by username");
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      orgs: true,
      events: true,
    }
  });

  return user;
}

export async function getAllUsersWithOrgs() {
  return prisma.user.findMany({
    include: {
      orgs: true,
    },
  });
}

export async function createUser(username: string) {
  console.log("creating user");
  const user = await prisma.user.create({
    data: {
      firstName: "",
      lastName: "",
      r_number: "",
      major: "",
      username,
    },
  });

  return user;
}

export async function internalUpdateUserByUsername(
  username: string,
  data: Partial<User>
) {
  console.log("updating user by username");
  const user = await prisma.user.update({
    where: {
      username,
    },
    data,
  });

  return user;
}
