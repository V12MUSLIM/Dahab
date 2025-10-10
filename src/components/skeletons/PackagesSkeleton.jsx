import { Skeleton } from "@/components/ui/skeleton";

export function PackagesSkeleton() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <Skeleton className="h-6 w-32 mx-auto rounded-full" />
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-6 w-[600px] max-w-full mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="space-y-3 pt-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-12 w-full rounded-lg mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}