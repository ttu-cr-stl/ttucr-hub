"use server";
import prisma from "@/db/prisma";
import { NavPath } from "@/lib/types";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { ExtendedUser } from "@/lib/types/prismaTypes";

export async function getAllUsers() {
  console.log("fetching all users");
  const users = await prisma.user.findMany();

  return users;
}

export async function getUserByUsername(
  username: string
): Promise<ExtendedUser | null> {
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      orgs: true,
      EventAttendance: {
        include: {
          Event: true,
        },
      },
    },
  });

  return user
    ? {
        ...user,
        events: user.EventAttendance.map((ea) => ea.Event),
      }
    : null;
}

export async function getAllUsersWithOrgs() {
  return prisma.user.findMany({
    include: {
      orgs: true,
    },
  });
}

export async function createUser(username: string) {
  const user = await prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      firstName: "",
      lastName: "",
      major: "",
      username,
    },
  });

  return user;
}

export async function internalUpdateUserByUsername(
  username: string,
  data: Partial<User>
): Promise<ExtendedUser> {
  console.log("updating user by username");
  const user = await prisma.user.update({
    where: { username },
    data,
    include: {
      orgs: true,
      EventAttendance: {
        include: {
          Event: true,
        },
      },
    },
  });

  const updatedUser: ExtendedUser = {
    ...user,
    events: user.EventAttendance.map((ea) => ea.Event),
  };

  revalidatePath(NavPath.LEADERBOARD);
  return updatedUser;
}