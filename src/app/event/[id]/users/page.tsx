import UserCard from "@/components/pages/leaderboard/UserCard";
import { getEventUsers } from "@/db/events";

export default async function Event(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const users = await getEventUsers(params.id);

  return (
    <div className="flex flex-col gap-y-2 w-full pb-10">
      <span className="ml-10 text-lg font-medium mt-6 pt-0.5 mb-4">
        Signed Up
      </span>
      {users
        .sort((a, b) =>  a.firstName.localeCompare(b.firstName))
        .map((user) => (
          <UserCard key={user.username} user={user} />
        ))}
    </div>
  );
}
