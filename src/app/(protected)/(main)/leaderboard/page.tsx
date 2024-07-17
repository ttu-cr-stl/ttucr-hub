import React from "react";
import UsersList from "./UsersList";

export default function Leaderboard() {
  return (
    <div>
      <h1 className="text-4xl mx-2 my-8 font-bold">Leaderboard</h1>
      <UsersList />
    </div>
  );
}
