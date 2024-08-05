import UserCard from "@/components/pages/leaderboard/UserCard";
import { getEventUsers } from "@/db/events";

export default async function Event({ params }: { params: { id: string } }) {
    const users = await getEventUsers(params.id);

    return (
        <div className="flex flex-col gap-y-2 w-full pb-10">
            <span className="ml-12 text-lg font-medium mt-[18px] mb-4">Registered</span>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}