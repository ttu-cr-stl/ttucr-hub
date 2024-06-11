import React from "react";
import { Org } from "@prisma/client";
import { Card, CardHeader, CardTitle, CardFooter, CardContent, CardDescription } from "./card";

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
        {org.id}
      </CardFooter>
    </Card>
  );
}

export default OrgCard;
