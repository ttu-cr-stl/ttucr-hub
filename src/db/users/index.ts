"use server";
import prisma from "@/db/prisma";
import { NavPath } from "@/lib/types";
import { ExtendedUser } from "@/lib/types/prismaTypes";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

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

  console.log("Raw isNewUser value:", user?.isNewUser);
  console.log("Type of isNewUser:", typeof user?.isNewUser);

  if (user) {
    const extendedUser: ExtendedUser = {
      ...user,
      events: user.EventAttendance.map((ea) => ea.Event),
      isNewUser: user.isNewUser,
    };
    console.log("Final isNewUser value:", extendedUser.isNewUser);
    return extendedUser;
  }

  return null;
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
      isNewUser: true,
    },
  });

  console.log("created user", user);
  return user;
}

export async function internalUpdateUserByUsername(
  username: string,
  data: Partial<User>
): Promise<ExtendedUser> {
  console.log("updating user by username");
  const user = await prisma.user.update({
    where: { username },
    data: {
      ...data,
      // Only set isNewUser if it's explicitly included in the update data
      ...(data.isNewUser !== undefined ? { isNewUser: data.isNewUser } : {}),
    },
    include: {
      orgs: true,
      EventAttendance: {
        include: {
          Event: true,
        },
      },
    },
  });

  console.log("updated user", user);

  const updatedUser: ExtendedUser = {
    ...user,
    events: user.EventAttendance.map((ea) => ea.Event),
    isNewUser: user.isNewUser,
  };

  revalidatePath(NavPath.LEADERBOARD);
  return updatedUser;
}
