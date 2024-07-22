"use server";
import prisma from "@/db/prisma";

export async function getAllEvents() {
  const events = await prisma.event.findMany();

  return events;
}

export async function getEventById(id: string) {
  const user = await prisma.event.findUnique({
    where: {
      id,
    },
  });

  return user;
}

export async function getEventByIdWithUserPics(id: string) {
  const user = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          profilePic: true,
        },
      },
    },
  });

  return user;
}
