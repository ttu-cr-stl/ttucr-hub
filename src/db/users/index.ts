"use server";
import prisma from "@/db/prisma";

export async function getAllUsers() {
  return await prisma.user.findMany();
}
