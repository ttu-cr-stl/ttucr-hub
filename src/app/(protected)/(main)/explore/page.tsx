import OrgsList from "@/components/pages/explore/OrgsList";
import React from "react";

export default function Explore() {
  return (
    <>
      <input
        className="m-5 border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-3xl text-sm focus:outline-none"
        type="search"
        id="orgsearch"
        name="orgsearch"
        placeholder="Search TTU@CR"
      />
      <OrgsList />
    </>
  );
}
