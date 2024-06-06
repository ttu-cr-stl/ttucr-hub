import { getAllActivities } from "@/db/activity";
import { FC } from "react";

interface ActivitiesListProps {}

export const ActivitiesList: FC<ActivitiesListProps> = async ({}) => {
  const activities = await getAllActivities();
  return (
    <div className={"flex flex-col space-y-2 font-bold"}>
      {activities.map((activity) => (
        <span key={activity.id}>{activity.name}</span>
      ))}
    </div>
  );
};
