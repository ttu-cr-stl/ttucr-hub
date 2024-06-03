"use client";
import { useUser } from "@/lib/hooks/useUser";
import { FC } from "react";

interface PersonalInfoProps {}

export const PersonalInfo: FC<PersonalInfoProps> = ({}) => {
  const { user } = useUser();

  return (
    <div className="">
        jhfkje
    </div>
  );
};
