import { getActivityById } from "@/db/activity";

export default async function Activity({ params }: { params: { id: string } }) {
  const activity = await getActivityById(params.id);

  if (!activity) return <div>Activity not found</div>;

  return (
    <div className="">
      <span>{activity.name}</span>
    </div>
  );
}
