export function BriefSkeleton() {
  return (
    <div className="mt-4 space-y-5">
      <div className="h-7 w-2/3 animate-pulse rounded-xl bg-white/10" />

      <div className="grid gap-3 md:grid-cols-3">
        <div className="h-20 animate-pulse rounded-xl bg-white/10" />
        <div className="h-20 animate-pulse rounded-xl bg-white/10" />
        <div className="h-20 animate-pulse rounded-xl bg-white/10" />
      </div>

      <div className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded-xl bg-white/10" />
        <div className="h-4 w-11/12 animate-pulse rounded-xl bg-white/10" />
        <div className="h-4 w-4/5 animate-pulse rounded-xl bg-white/10" />
      </div>

      <div className="space-y-3">
        <div className="h-24 animate-pulse rounded-xl bg-white/10" />
        <div className="h-24 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}
