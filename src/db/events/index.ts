"use server";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function getAllEvents() {
  const events = await prisma.event.findMany({include: {users: {select: {profilePic: true}}}});

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
          id: true,
          profilePic: true,
        },
      },
    },
  });

  return user;
}

export async function getEventUsers(id: string) {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });

  return event?.users || [];

}

export async function toggleUserToEvent(eventId: string, userId: string, alreadyRegistered: boolean) {

  console.log("toggleUserToEvent", eventId, userId, alreadyRegistered);

  if (!alreadyRegistered) {
    await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
  } else {
    await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  revalidatePath(`/event/${eventId}`);
  revalidatePath(`/event/${eventId}/users`);

  return !alreadyRegistered;
}
