export default function BouncingLoading() {
  return (
    <div className="bouncing-loader text-text p-4 m-auto">
      <span className="text-sm font-medium px-2">Loading</span>
      <div className="dot bg-primary"></div>
      <div className="dot bg-secondary"></div>
      <div className="dot bg-tertiary"></div>
    </div>
  );
}
