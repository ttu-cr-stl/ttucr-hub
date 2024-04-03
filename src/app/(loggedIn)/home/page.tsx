"use client";
import { getAllUsers } from "@/db/users";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    if (!users) {
      getAllUsers().then((users) => {
        setUsers(users);
      });
    }
  }, [users]);

  if (!users) {
    return <span>Loading</span>;
  }

  console.log(users);

  return (
    <div className="flex flex-col pt-12 px-8">
      {users.map((user) => (
        <div key={user.id} className="">
          user #{user.name}
        </div>
      ))}
    </div>
  );
}
