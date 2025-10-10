import { Skeleton } from "@/components/ui/skeleton";

export function ActivitiesSkeleton() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-24 mx-auto rounded-full" />
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-6 w-[500px] max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-16 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
