import { Button } from "@/components/ui/shadcn/button";
import { getActivityById } from "@/db/activity";
import { format, formatDistance } from "date-fns";

export default async function Activity({ params }: { params: { id: string } }) {
  const activity = await getActivityById(params.id);

  if (!activity) return <div className="text-red-500 font-bold text-xl p-5">Activity not found</div>;

return (
  <div className="w-full mx-auto my-8">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-5">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{activity.name}</h1>
        <h2 className="text-xl font-medium text-gray-600 mb-4">{activity.description}</h2>
        <div className="flex flex-col gap-2 mb-4">
          <h4 className="text-lg text-gray-700">Duration: 
            <span className="font-medium">{formatDistance(activity.startTime, activity.endTime)}</span></h4>
          <h4 className="text-lg text-gray-700">Start: 
            <span className="font-medium">{format(activity.startTime, "dd/mm/yyyy")}</span></h4>
          <h4 className="text-lg text-gray-700">End: 
            <span className="font-medium">{format(activity.endTime, "dd/mm/yyyy")}</span></h4>
        </div>
        <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
          Register
        </Button>
      </div>
    </div>
  </div>
);
}
