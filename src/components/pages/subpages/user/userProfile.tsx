import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { getUserByUsername } from "@/db/users";
import { getDegreeByKey } from "@/lib/utils";
import { FC } from "react";

interface UserProfileProps {
  username: string;
}

const UserComponent: FC<UserProfileProps> = async ({ username }) => {
  const user = await getUserByUsername(username);

  if (!user) return <div>User not found</div>;

  const degree = getDegreeByKey(user.major);

  return (
    <div className="flex flex-col items-center w-auto h-auto bg-[#ececec] rounded-lg text-center p-3 justify-center">
      <Avatar className="w-24 h-24">
        <AvatarImage src="" />
        <AvatarFallback>
          {user.firstName[0]}
          {user.lastName[0]}
        </AvatarFallback>
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
};

export default UserComponent;
