"use client";
import { useUser } from "@/lib/hooks/useUser";
import { FC } from "react";

interface WelcomeProps {}

export const Welcome: FC<WelcomeProps> = ({}) => {
  const { user, updateUser, userLoading } = useUser();

  return (
    <>
      <span>Welcome, {user?.firstName}!</span>

      {/* <Button
        onClick={() => {
          updateUser({ address: "0x5bfa" });
        }}
      >
        {userLoading ? "Loading..." : "Change address"}
      </Button> */}
    </>
  );
};
