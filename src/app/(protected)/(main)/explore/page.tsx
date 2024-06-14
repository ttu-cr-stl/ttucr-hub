"use client";
import React, { useEffect, useState } from "react";
import OrgCard from "@/components/ui/OrgCard";
import { Org } from "@prisma/client";
import { getAllOrgs } from "@/db/orgs";

export default function Explore() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchOrgs() {
      try {
        const data = await getAllOrgs();
        setOrgs(data);
      } catch (error) {
        console.log('Error fetching data from the database:', error);
        setError(true);
      }
    }

    fetchOrgs();
  }, []);

  return (
    <div>
      {orgs.map((org) => (
        <OrgCard key={org.id} org={org} />
      ))}

      {error && <span>An error has occurred</span>}
    </div>
  );
}
