"use client";
import React, { useEffect, useState } from "react";
import OrgCard from "@/components/ui/OrgCard";
import { Org } from "@prisma/client";
import { getAllOrgs } from "@/db/orgs";

export default function Explore() {
  const [orgs, setOrgs] = useState<Org[]>([]);

  useEffect(() => {
    async function fetchOrgs() {
      const data = await getAllOrgs();
      setOrgs(data);
    }

    fetchOrgs();
  }, []);

  return (
    <div className="">
      {orgs.map((org) => (
        <OrgCard key={org.id} org={org} />
      ))}
    </div>
  );
}
