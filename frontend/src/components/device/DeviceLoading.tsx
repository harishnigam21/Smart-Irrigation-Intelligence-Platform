export default function DeviceLoading() {
  return (
    <section className="bg-bgprimary w-full h-screen overflow-hidden blueprint-grid">
      <div className="bg-bgsecondary/50 animate-pulse rounded-md min-h-full w-full flex flex-col gap-2 items-center justify-center">
        <div className="sm:w-1/2 sm:h-15 w-9/10 h-10 rounded-md bg-txlight animate-pulse"></div>
        <div className="sm:w-1/4 sm:h-15 rounded-md w-1/2 h-10 bg-txlight animate-pulse"></div>
        <div className="sm:w-[40%] sm:h-7 w-8/10 h-4 rounded-md bg-txlight animate-pulse mt-8"></div>
        <div className="sm:w-1/4 sm:h-7 h-4 w-2/10 rounded-md bg-txlight animate-pulse"></div>
        <div className="flex flex-wrap gap-3 mt-10">
          <button className="sm:w-25 sm:h-7 w-10 h-4 rounded-full animate-pulse bg-txlight"></button>
          <button className="sm:w-25 sm:h-7 w-10 h-4 rounded-full animate-pulse bg-txlight"></button>
        </div>
      </div>
    </section>
  );
}
