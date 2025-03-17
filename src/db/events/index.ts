"use server";
import prisma from "@/db/prisma";
import { revalidatePath } from "next/cache";
export async function getAllEvents(
  filter: "future" | "past" | "all" = "future"
) {
  const today = new Date();

  let events = await prisma.event.findMany({
    where: {
      startTime:
        filter === "future"
          ? { gte: today }
          : filter === "past"
            ? { lt: today }
            : undefined,
      status: "PUBLISHED",
      publishedAt: { not: null },
    },
    include: {
      EventAttendance: {
        include: {
          User: {
            select: { profilePic: true },
          },
        },
      },
    },
    orderBy: [{ startTime: "asc" }],
  });

  if (filter === "past") {
    events = events.filter((event) => event.endTime && event.endTime < today);
  }

  return events.map((event) => ({
    ...event,
    users: event.EventAttendance.map((ea) => ea.User),
  }));
}

export async function getEventById(id: string) {
  const event = await prisma.event.findUnique({
    where: {
      id,
      status: "PUBLISHED",
      publishedAt: { not: null },
    },
  });

  return event;
}

export async function getEventByIdWithUserPics(id: string) {
  const event = await prisma.event.findUnique({
    where: {
      id,
      status: "PUBLISHED",
      publishedAt: { not: null },
    },
    include: {
      EventAttendance: {
        include: {
          User: {
            select: {
              username: true,
              profilePic: true,
            },
          },
        },
      },
    },
  });

  return event;
}

export async function getEventUsers(id: string) {
  const event = await prisma.event.findUnique({
    where: {
      id,
      status: "PUBLISHED",
      publishedAt: { not: null },
    },
    include: {
      EventAttendance: {
        include: {
          User: {
            include: {
              orgs: true,
            },
          },
        },
      },
    },
  });

  return event?.EventAttendance.map((ea) => ea.User) || [];
}

export async function toggleUserToEvent(
  eventId: string,
  username: string,
  alreadySignedUp: boolean
) {
  console.log("toggleUserToEvent", eventId, username, alreadySignedUp);

  if (!alreadySignedUp) {
    await prisma.eventAttendance.create({
      data: {
        id: `${username}-${eventId}`,
        username,
        eventId,
      },
    });
  } else {
    await prisma.eventAttendance.delete({
      where: {
        id: `${username}-${eventId}`,
      },
    });
  }

  revalidatePath(`/user/${username}`);
  revalidatePath(`/event/${eventId}`);
  revalidatePath(`/event/${eventId}/users`);

  return !alreadySignedUp;
}
