"use server";
import prisma from "@/db/prisma";

export async function getAllEvents() {
  const events = await prisma.event.findMany();

  return events;
}

export async function getEventById(id: string) {
  console.log("fetching user by username");
  const user = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return user;
}
