import { Event, User } from "@prisma/client";
import { FC } from "react";
import { EventCard } from "./EventCard";

interface EventsListProps {
  events: (Event & {
    users: Pick<User, "profilePic">[];
  })[];
  small: boolean;
}

export const EventsList: FC<EventsListProps> = ({ events, small }) => {
  return (
    <div className="flex flex-col space-y-4">
      {events
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
        .map((event) => (
          <EventCard key={event.id} event={event} small={small} />
        ))}
    </div>
  );
};