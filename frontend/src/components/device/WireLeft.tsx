"use client";

import { RadioTower } from "lucide-react";

export default function WireLeft({
  isUsed,
  i,
  pointIntervalLeft,
  setSelectedSensor,
  setShowSensor,
}: {
  isUsed: any;
  i: number;
  pointIntervalLeft: number;
  setSelectedSensor: React.Dispatch<React.SetStateAction<any>>;
  setShowSensor: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <>
      <g
        transform={`translate(${i * pointIntervalLeft})`}
        onMouseOver={() => {
          setShowSensor(true);
          setSelectedSensor(isUsed);
        }}
        onMouseOut={() => {
          setShowSensor(false);
          setSelectedSensor(null);
        }}
        className="group"
      >
        <foreignObject x="-148" y="280" width="5px" height="100px">
          <div
            className={`relative w-full h-full group-hover:border bg-bgsecondary flex items-center justify-center rounded`}
          >
            <div
              className={`size-1 bg-blue-500 rounded-full ${isUsed.status == "active" ? "animate-signal-flow-opp" : "animate-none"}`}
            />
          </div>
        </foreignObject>
        <foreignObject x="-160" y="360" width="50px" height="50px">
          <div
            className={`text-xl rounded-xl flex w-full h-full flex-col -rotate-90 transition-all z-50`}
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
