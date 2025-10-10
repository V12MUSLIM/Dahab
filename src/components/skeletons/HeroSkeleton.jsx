import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <div className="relative h-screen w-full bg-slate-100">
      <Skeleton className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6 px-4">
        <Skeleton className="h-8 w-32 rounded-full" />
        <Skeleton className="h-16 w-96 max-w-full" />
        <Skeleton className="h-6 w-[600px] max-w-full" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-36 rounded-lg" />
          <Skeleton className="h-12 w-36 rounded-lg" />
        </div>
        <div className="flex gap-8 pt-8">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
}