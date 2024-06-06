import { Welcome } from "@/components/pages/home/Welcome";
import { ActivitiesGrid } from "@/components/pages/home/ActivitiesGrid";

export default function Home() {
  return (
    <div className="flex flex-col pt-12 px-8 space-y-8">
      <Welcome />
      <ActivitiesGrid />
    </div>
  );
}
