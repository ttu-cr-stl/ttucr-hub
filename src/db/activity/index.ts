"use server";
import prisma from "@/db/prisma";

export async function getAllActivities() {
  const activities = await prisma.activity.findMany();

  return activities;
}

export async function getActivityById(id: string) {
  console.log("fetching user by username");
  const user = await prisma.activity.findUnique({
    where: {
      id,
    },
  });

  return user;
}
