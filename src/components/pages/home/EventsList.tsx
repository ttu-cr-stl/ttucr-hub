import { getAllEvents } from "@/db/events";
import { FC } from "react";
import { Event, User } from "@prisma/client";
import { EventCard } from "./EventCard";

interface EventsListProps {
  events?: ({
    users: {
        profilePic: string | null;
    }[];
    } & {
      id: string;
      name: string;
      description: string;
      startTime: Date;
      location: string;
      organizer: string;
      coverImg: string | null;
      createdAt: Date;
      updatedAt: Date | null;
    })[];
  small: boolean;
}

export const EventsList: FC<EventsListProps> = async ({events, small}) => {
  if (!events) {
    events = await getAllEvents();
  }
  // console.log(events.map((event) => event.name));
  return (
    <div className={"flex flex-col space-y-2 font-bold"}>
      {events.map((event, index) => (
        <EventCard key={index} event={event} small={small}/>
      ))}
    </div>
  );
};