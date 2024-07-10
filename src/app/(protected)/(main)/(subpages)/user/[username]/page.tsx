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

  return (
    <div className="flex flex-col items-center w-auto h-auto text-center p-3 justify-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src="" />
        <AvatarFallback className="bg-[#D9D9D9]"></AvatarFallback>
      </Avatar>
      <h2>
        {user.firstName} {user.lastName}
      </h2>
      <h4>
        <span className="text-[#cc0000]">R-Number:</span> {user.r_number}
      </h4>
      <div
        className="w-fit px-2 pt-0.5 pb-1 mt-2 rounded-full border"
        style={{ color: degree?.color, borderColor: degree?.color }}
      >
        <span>{degree?.name}</span>
      </div>
      <span>{user.minor == "NONE" ? false : user.minor}</span>
    </div>
  );
}
