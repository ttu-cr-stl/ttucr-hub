import OrgsList from "@/components/pages/explore/OrgsList";
import React from "react";

export default function Explore() {
  return (
    <>
      <input
        className="m-5 h-10 w-auto px-5 pr-10 rounded-3xl border-2 border-gray-300 bg-white text-sm focus:outline-none"
        type="search"
        id="orgsearch"
        placeholder="Search TTU@CR"
      />
      <OrgsList />
    </>
  );
}
