export default function loading() {
  const skeletonRows = Array.from({ length: 15 });
  return (
    <div className="w-full mx-auto bg-[#121212] rounded-xl shadow-xl overflow-hidden border border-zinc-800/50">
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#161616]">
        <div className="flex items-center gap-4">
          <div className="w-4 h-4 bg-zinc-800 rounded animate-pulse" />
          <div className="w-4 h-4 bg-zinc-800 rounded-full animate-pulse" />
          <div className="w-2 h-4 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-3 bg-zinc-800 rounded animate-pulse" />
          <div className="w-3 h-3 bg-zinc-800 rounded animate-pulse" />
          <div className="w-3 h-3 bg-zinc-800 rounded animate-pulse" />
        </div>
      </div>

      <div className="divide-y divide-zinc-800/60">
        {skeletonRows.map((_, index) => (
          <div
            key={`alert-skeleton-row-${index}`}
            className="flex items-center justify-between px-6 py-3.5 hover:bg-zinc-900/40 transition-colors"
          >
            <div className="flex items-center gap-4 w-1/4 min-w-50">
              <div className="w-4 h-4 bg-zinc-800 border border-zinc-700/50 rounded shrink-0 animate-pulse" />
              <div className="w-4 h-4 bg-zinc-800 rounded shrink-0 animate-pulse" />
              <div className="w-32 h-4 bg-zinc-700 rounded-md animate-pulse" />
            </div>

            <div className="flex-1 px-4 max-w-2xl">
              <div
                className={`h-4 bg-zinc-800 rounded-md animate-pulse ${
                  index === 14
                    ? "w-2/3 bg-zinc-800/80"
                    : index % 3 === 0
                      ? "w-1/2"
                      : "w-5/12"
                }`}
              />
            </div>

            <div className="w-16 flex justify-end">
              <div className="w-10 h-3.5 bg-zinc-800 rounded-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
