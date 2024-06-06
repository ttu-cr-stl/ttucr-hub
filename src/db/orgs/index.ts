"use server";
import prisma from "../prisma";

export async function getAllOrgs() {
  console.log("fetching all orgs");
  const orgs = await prisma.org.findMany();

  return orgs;
}
