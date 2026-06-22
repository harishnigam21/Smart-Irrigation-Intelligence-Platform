
export default function Loading() {
  return (
    <article className="relative w-full h-full flex flex-col justify-center items-center">
      <div className="flex items-center justify-center-safe text-text gap-3 absolute top-0 pt-5">
        
        <h1
          className="text-3xl lg:text-4xl xl:text-5xl w-40 sm:w-80 h-10 bg-bgsecondary animate-pulse rounded-md"
        >
        </h1>
        
      </div>
      <div className="relative w-full sm:w-50 lg:w-80 h-80 lg:h-120 rounded-md flex flex-col items-center bg-bgsecondary animate-pulse"></div>
    </article>
  );
}
