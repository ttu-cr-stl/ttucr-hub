import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { getUserByUsername } from "@/db/users";
import { getDegreeByKey } from "@/lib/utils";

interface UserProfileProps {
  username: string;
}

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) return <div>User not found</div>;

  const degree = getDegreeByKey(user.major);
  const minor = getDegreeByKey(String(user.minor));

  return (
    <div className="flex flex-col items-center w-auto h-auto text-center p-3 justify-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src="" />
        <AvatarFallback className="bg-gray-300">
          {user.firstName[0]}
          {user.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <span className="text-gray-500">@{user.username}</span>
      </div>
      <div className="flex flex-row gap-2">
        <div
          className="text-white w-fit px-2 pt-0.5 pb-1 mt-2 rounded-full border"
          style={{
            backgroundColor: degree?.color /* , borderColor: degree?.color */,
          }}
        >
          <span>{degree?.name}</span>
        </div>
        {user.minor !== "NONE" && (
          <div
            className="text-white w-fit px-2 pt-0.5 pb-1 mt-2 rounded-full border"
            style={{ backgroundColor: minor?.color }}
          >
            <span>{minor?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
