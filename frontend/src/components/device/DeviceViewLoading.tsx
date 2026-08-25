export default function DeviceViewLoading() {
  return (
    <article className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <div className="flex items-center justify-center-safe text-textPri gap-3 absolute top-0 mt-18">
        <div className="w-70 sm:w-80 h-10 bg-txlight animate-pulse rounded-md"></div>
      </div>
      <div className="relative w-50 sm:w-50 lg:w-80 h-80 lg:h-120 rounded-md flex flex-col items-center bg-txlight animate-pulse"></div>
    </article>
  );
}
