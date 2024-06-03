import { getUserByEmail } from "@/db/users";
import { User } from "@prisma/client";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const { user: privyUser } = usePrivy();

  useEffect(() => {
    if (privyUser?.email?.address) {
      getUserByEmail(privyUser.email?.address).then((user) => {
        setUser(user);
      })
    }
  }, [privyUser]);

  return { user };
};
