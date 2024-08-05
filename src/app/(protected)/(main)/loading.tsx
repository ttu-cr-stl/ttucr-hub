import { Skeleton } from "@/components/ui/shadcn/skeleton";

export default function Loading() {
  return (
    <div className="pb-4 pt-6 w-full h-full">
      <Skeleton className="rounded-lg w-full h-full" />
    </div>
  );
}
