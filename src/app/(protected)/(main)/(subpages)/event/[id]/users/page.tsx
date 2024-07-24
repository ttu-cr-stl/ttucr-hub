import UserCard from "@/components/pages/leaderboard/UserCard";
import { getEventUsers } from "@/db/events";

export default async function Event({ params }: { params: { id: string } }) {
    const users = await getEventUsers(params.id);

    return (
        <div className="flex flex-col gap-y-2 w-full mt-5 pb-10">
            <span className="ml-12 text-xl font-medium mb-4">Attending</span>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}