import React from "react";
import UsersList from "./UsersList";

export default function Leaderboard() {
  return (
    <div>
      <h1 className="mx-2 my-8 text-4xl font-bold">Leaderboard</h1>
      <UsersList />
    </div>
  );
}
