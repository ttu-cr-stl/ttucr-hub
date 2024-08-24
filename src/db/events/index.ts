"use server";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function getAllEvents() {
  const events = await prisma.event.findMany({
    include: {
      EventAttendance: {
        include: {
          User: {
            select: { profilePic: true }
          }
        }
      }
    }
  });

  return events.map(event => ({
    ...event,
    users: event.EventAttendance.map(ea => ea.User)
  }));
}

export async function getEventById(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
  });

  return event;
}

export async function getEventByIdWithUserPics(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      EventAttendance: {
        include: {
          User: {
            select: {
              id: true,
              profilePic: true,
            }
          }
        }
      }
    }
  });

  return event;
}

export async function getEventUsers(id: string) {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      EventAttendance: {
        include: {
          User: {
            include: {
              orgs: true
            }
          }
        }
      }
    }
  });

  return event?.EventAttendance.map(ea => ea.User) || [];
}

export async function toggleUserToEvent(eventId: string, userId: string, alreadySignedUp: boolean) {
  console.log("toggleUserToEvent", eventId, userId, alreadySignedUp);

  if (!alreadySignedUp) {
    await prisma.eventAttendance.create({
      data: {
        id: `${userId}-${eventId}`,
        userId,
        eventId,
      }
    });
  } else {
    await prisma.eventAttendance.delete({
      where: {
        id: `${userId}-${eventId}`,
      }
    });
  }

  revalidatePath(`/user/${userId}`);
  revalidatePath(`/event/${eventId}`);
  revalidatePath(`/event/${eventId}/users`);

  return !alreadySignedUp;
}