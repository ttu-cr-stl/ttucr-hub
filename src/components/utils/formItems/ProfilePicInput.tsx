import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/shadcn/avatar";
import { FormComponentProps } from "@/lib/types";
import { FC } from "react";

export const ProfilePicInput: FC<FormComponentProps> = ({}) => {
  return (
    <Avatar className="w-28 h-28">
      <AvatarImage src={""} alt="profilePic" />
      <AvatarFallback>Default</AvatarFallback>
    </Avatar>
  );
};
