"use server";
import prisma from "@/db/prisma";

export async function getAllActivities() {
  console.log("fetching all users");
  const activities = await prisma.activity
    .findMany()
    .then((activities) =>
      activities.map((activity) => ({
        ...activity,
        active: Date.now() < activity.endTime.getTime(),
      }))
    );

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
