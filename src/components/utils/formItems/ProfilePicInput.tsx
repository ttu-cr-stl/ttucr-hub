import { FormComponentProps } from "@/lib/utils/consts";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";

export const ProfilePicInput: FC<FormComponentProps> = ({}) => {
  return (
    <Avatar className="w-28 h-28">
      <AvatarImage src={''} alt="profilePic" />
      <AvatarFallback>Default</AvatarFallback>
    </Avatar>
  );
};
