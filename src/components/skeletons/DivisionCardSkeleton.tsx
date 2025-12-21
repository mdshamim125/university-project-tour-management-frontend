import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DivisionCardSkeleton() {
  return (
    <Card className="relative overflow-hidden rounded-2xl shadow-md">
      {/* Image Skeleton */}
      <div className="h-56 w-full">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Text Skeleton */}
      <div className="absolute bottom-5 left-5 right-5 space-y-2">
        <Skeleton className="h-5 w-32 bg-white/70" />
        <Skeleton className="h-4 w-24 bg-white/50" />
      </div>
    </Card>
  );
}
