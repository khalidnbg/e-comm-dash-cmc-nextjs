import db from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await db.store.findFirst({ where: { userId } });

  if (store) {
    redirect(`/${store.id}`); // app/dashboard/[storeId]
  }

  return <>{children}</>;
}
