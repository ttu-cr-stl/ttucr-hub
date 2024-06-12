import React from "react";
import { Org } from "@prisma/client";
import * as card from "./card";
import Link from "next/link";
import Image from "next/image";

function OrgCard({ org }: { org: Org }) {
  return (
    <Link href={`/org/${org.id}`}>
      <card.Card className="mt-2">
        <card.CardHeader>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <card.CardTitle>{org.name}</card.CardTitle>
            <Image src={"/TTULogo.png"} alt={org.name} width={50} height={50} />
          </div>
        </card.CardHeader>
        <card.CardContent>
          <card.CardDescription>{org.description}</card.CardDescription>
        </card.CardContent>
        <card.CardFooter
          className="rounded-br-lg rounded-bl-lg border border-stone-200 P-0"
          style={{ backgroundColor: `${org.color}` }}
        />
      </card.Card>
    </Link>
  );
}

export default OrgCard;
