export default function DeviceLoading() {
  return (
    <section className="bg-bgprimary w-full h-screen overflow-hidden blueprint-grid">
      <div className="bg-bgsecondary/50 animate-pulse rounded-md min-h-full w-full flex flex-col gap-2 items-center justify-center">
        <div className="w-1/2 h-15 rounded-md bg-txlight animate-pulse"></div>
        <div className="w-1/4 h-15 rounded-md bg-txlight animate-pulse"></div>
        <div className="w-[40%] h-7 rounded-md bg-txlight animate-pulse mt-8"></div>
        <div className="w-1/4 h-7 rounded-md bg-txlight animate-pulse"></div>
        <div className="flex flex-wrap gap-3 mt-10">
          <button className="w-25 h-7 rounded-full animate-pulse bg-txlight"></button>
          <button className="w-25 h-7 rounded-full animate-pulse bg-txlight"></button>
        </div>
      </div>
    </section>
  );
}
