import { RadioTower } from "lucide-react";

export default function WireRight({
  isUsed,
  i,
  pointIntervalRight,
  setSelectedSensor,
  setShowSensor,
}: {
  isUsed: any;
  i: number;
  pointIntervalRight: number;
  setSelectedSensor: React.Dispatch<React.SetStateAction<any>>;
  setShowSensor: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <g
        className="relative z-50 group"
        transform={`translate(${i * pointIntervalRight})`}
        onMouseOver={() => {
          setShowSensor(true);
          setSelectedSensor(isUsed);
        }}
        onMouseOut={() => {
          setShowSensor(false);
          setSelectedSensor(null);
        }}
      >
        <foreignObject x="-147.5" y="-165" width="5px" height="100px">
          <div
            className={`relative w-full h-full bg-bgsecondary flex items-center justify-center rounded z-10 group-hover:border`}
          >
            <div
              className={`size-1 bg-blue-500 rounded-full ${isUsed.status == "active" ? "animate-signal-flow" : "animate-none"}`}
            />
          </div>
        </foreignObject>
        <foreignObject x="-160" y="-200" width="50px" height="50px">
          <div
            className={`text-xl rounded-xl flex w-full h-full flex-col -rotate-90 transition-all z-10`}
          >
            <RadioTower
              color={`${isUsed && isUsed.status == "active" ? "greenyellow" : isUsed?.status == "error" ? "red" : "#a4a39b"}`}
              className={`size-8 ${isUsed && isUsed.status == "active" ? "animate-pulse" : "animate-none"}`}
            />
          </div>
        </foreignObject>
      </g>
    </>
  );
}
