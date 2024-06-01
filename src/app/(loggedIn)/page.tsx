"use client"
import { usePrivy } from "@privy-io/react-auth";
import React from "react";

export default function Home() {

  const { user } = usePrivy();

  return (
    <div className="flex flex-col pt-12 px-8">
      <span>Welcome, {user?.email?.address}!</span>
    </div>
  );
}
