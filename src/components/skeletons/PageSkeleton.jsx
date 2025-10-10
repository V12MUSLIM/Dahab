import { HeroSkeleton } from "./HeroSkeleton";
import { GallerySkeleton } from "./GallerySkeleton";
import { PackagesSkeleton } from "./PackagesSkeleton";
import { DestinationsSkeleton } from "./DestinationsSkeleton";
import { ActivitiesSkeleton } from "./ActivitiesSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSkeleton />
      <GallerySkeleton />
      <PackagesSkeleton />
      <DestinationsSkeleton />
      <ActivitiesSkeleton />
      {/* Additional sections skeleton */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}