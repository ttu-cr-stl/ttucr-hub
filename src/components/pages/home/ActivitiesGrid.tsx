import { getAllActivities } from "@/db/activity";
import { FC } from "react";

interface ActivitiesGridProps {}

export const ActivitiesGrid: FC<ActivitiesGridProps> = async ({}) => {
  const activities = await getAllActivities();
  return (
    <div className={""}>
      {activities.map((activity) => (
        <span key={activity.id}>{activity.name}</span>
      ))}
    </div>
  );
};
