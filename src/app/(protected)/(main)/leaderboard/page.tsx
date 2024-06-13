"use client";
import React, { useEffect, useState } from "react";
import UserCard from "@/components/ui/UserCard";
import { User } from "@prisma/client";
import { getAllUsers } from "@/db/users";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getAllUsers();
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div className="">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
