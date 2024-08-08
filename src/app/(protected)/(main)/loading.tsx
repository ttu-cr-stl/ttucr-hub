import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="pb-24 pt-6 w-dvw h-dvh">
      <Skeleton className="rounded-lg w-full h-full" />
    </div>
  );
}
