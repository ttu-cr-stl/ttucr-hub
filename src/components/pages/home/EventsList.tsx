import { EventCard } from "@/components/ui/EventCard";
import { getAllEvents } from "@/db/event";
import { FC } from "react";

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
