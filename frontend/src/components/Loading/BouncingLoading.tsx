export default function BouncingLoading() {
  return (
    <div className="bouncing-loader text-text p-4 m-auto">
      <span className="text-sm font-medium px-2">Loading</span>
      <div className="dot bg-pri"></div>
      <div className="dot bg-sec"></div>
      <div className="dot bg-ter"></div>
    </div>
  );
}
