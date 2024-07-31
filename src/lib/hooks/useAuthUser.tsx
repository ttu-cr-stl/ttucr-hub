"use client";
import { getUserByUsername, internalUpdateUserByUsername } from "@/db/users";
import { Event, Org, User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { extractUsername } from "../utils";

export const useAuthUser = () => {
  const [user, setUser] = useState<
    (User & { orgs?: Org[]; events?: Event[] }) | null
  >(null);
  const { user: privyUser } = usePrivy();

  useEffect(() => {
    if (privyUser && privyUser?.email?.address) {
      getUserByUsername(extractUsername(privyUser.email?.address))
        .then((user) => setUser(user))
        .catch((error) => console.error(error));
    }
  }, [privyUser]);

  return user;
};
