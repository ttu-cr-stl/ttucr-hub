import SubPageLayout from "@/app/(protected)/(main)/(subpages)/layout";
import { ReactNode } from "react";
import AppLayout from "../(protected)/(main)/layout";

export default function EventLayout({ children }: { children: ReactNode }) {
  return (
    <AppLayout>
      <SubPageLayout>{children}</SubPageLayout>
    </AppLayout>
  );
}
