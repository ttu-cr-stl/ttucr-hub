import OrgsList from "@/components/pages/explore/OrgsList";
import React from "react";

export default function Explore() {
  return (
    <>
      <div className="relative m-5">
        <span className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="h-5 w-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          className="w-full h-10 px-5 pr-16 text-sm rounded-3xl shadow-sm bg-white focus:outline-none"
          placeholder="Search TTU@CR"
        />
      </div>
      <OrgsList />
    </>
  );
}
