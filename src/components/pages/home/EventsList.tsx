import { getAllEvents } from "@/db/events";
import { FC } from "react";
import { EventCard } from "./EventCard";

interface EventsListProps {}

export const EventsList: FC<EventsListProps> = async ({}) => {
  const events = await getAllEvents();
  return (
    <div className={"flex flex-col space-y-2 font-bold"}>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
  );
};
