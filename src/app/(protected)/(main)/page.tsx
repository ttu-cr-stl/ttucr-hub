import { EventsList } from "@/components/pages/home/EventsList";
import { Welcome } from "@/components/pages/home/Welcome";

export default function Home() {
  return (
    <div className="flex flex-col pt-8">
      <Welcome />
      <span className="text-sm font-light mt-6 mb-2">
        {"What's happening on Campus..."}
      </span>
      <EventsList small={false}/>
    </div>
  );
}
