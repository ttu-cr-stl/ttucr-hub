import { EventsList } from "@/components/pages/home/EventsList";
import { Welcome } from "@/components/pages/home/Welcome";
import { getAllEvents } from "@/db/events";

export const revalidate = 0;

export default async function Home() {
  const events = await getAllEvents();
  const filteredEvents = events.filter(event => event.id === 'cm04gwab700008o8h5vesb91j');

  return (
    <div className="flex flex-col pt-8">
      <Welcome />
      <span className="text-sm font-light mt-4 mb-2">
        {"What's happening on Campus..."}
      </span>
      <EventsList events={filteredEvents} small={false} />
    </div>
  );
}
