import React from "react";
import { Org } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "./card";
import { Button } from "./button";
import Link from "next/link";

function OrgCard({ org }: { org: Org }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{org.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription>{org.description}</CardDescription>
      </CardContent>

      <CardFooter>
        <Link href={`/org/${org.id}`}>
          <Button>Org Page</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default OrgCard;
