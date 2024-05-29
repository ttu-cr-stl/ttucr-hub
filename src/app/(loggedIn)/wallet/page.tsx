"use client";

import { getAllUsers } from "@/db/users";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";

export default function Wallet() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    if (!users) {
      getAllUsers().then((users) => {
        setUsers(users);
      });
    }
  }, [users]);

  console.log(users)

  return (
    <div className="">
      <span>wallet</span>
    </div>
  );
}
