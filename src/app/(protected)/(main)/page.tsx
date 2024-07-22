import { EventsList } from "@/components/pages/home/EventsList";
import { Welcome } from "@/components/pages/home/Welcome";

export default function Home() {
  return (
    <div className="flex flex-col pt-12 px-8 space-y-8">
      <Welcome />
      <EventsList small={false}/>
    </div>
  );
}
