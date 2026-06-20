import HorizontalBar from "@/components/Loading/HorizontalBar";

export default function loading() {
  return (
    <section className="relative m-auto h-full w-screen p-6 space-y-6 overflow-hidden">
      <HorizontalBar position="top-0 left-0" />
      {/* summary slider */}
      <div className="flex justify-start relative flex-nowrap overflow-x-auto scrollbar-none gap-4 mb-4">
        {/* Average Readings */}
        <div className="rounded-lg bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 w-40 md:w-70 h-20 animate-pulse"></div>
        {/* devices */}
        <div className="rounded-lg bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 w-40 h-20 animate-pulse"></div>
        {/* sensors */}
        <div className="rounded-lg bg-bgsecondary transition-all p-2 sm:p-3 lg:px-4 lg:py-2 w-40 h-20 animate-pulse"></div>
      </div>
      {/* Farm Slider */}
      <article className="relative bg-bgsecondary rounded-xl py-4 max-w-full h-100 lg:h-150 flex flex-col p-2">
        <h2 className="mb-2 text-xl lg:text-2xl px-4 h-10 max-w-40 animate-pulse rounded-md bg-bgprimary "></h2>
        <div className="w-full overflow-x-auto flex flex-nowrap items-center whitespace-nowrap scrollbar-none gap-2 px-4">
          {Array.from({ length: 4 }).map((item, index) => (
            <small
              key={`farm/skeleton/device/${index}`}
              className="px-2 py-1 sm:px-3 w-30 h-8 rounded-full bg-bgprimary animate-pulse"
            ></small>
          ))}
        </div>
        <div className="p-4 w-full grow">
          <div className="w-full h-full bg-bgprimary animate-pulse"></div>
        </div>
        <div className="flex items-center justify-center px-4">
          {Array.from({ length: 3 }).map((item, index) => (
            <div
              key={`farm/slide/dot/${index}`}
              className={`group flex items-center w-5 h-5 justify-center p-1 cursor-pointer`}
            >
              <p
                className={`w-full h-1 bg-bgprimary animate-pulse transition-all`}
              ></p>
            </div>
          ))}
        </div>
      </article>

      {/* Readings */}
      <article className="bg-bgsecondary rounded-xl p-4 flex flex-col mt-4">
        <h2 className="mb-2 text-xl lg:text-2xl px-4 h-10 max-w-40 animate-pulse rounded-md"></h2>
        <div className="w-full h-40 animate-pulse bg-bgprimary"></div>
      </article>
    </section>
  );
}
