"use client";

import { useEffect, useState } from "react";
import HorizontalBar from "../Loading/HorizontalBar";
import useApi from "@/hooks/useApi";
import { Data } from "@/types/data";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/Store";
import { devicePowerON } from "@/store/slices/SummarySlice";

export default function SimulationReading({
  simulation,
  setSimulation,
  id,
  status,
}: {
  status: string;
  simulation: boolean;
  setSimulation: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}) {
  const { sendRequest } = useApi();
  const dispatch = useAppDispatch();
  const [readings, setReadings] = useState<
    { soilMoisture: number; temperature: number; waterFlow: number }[]
  >([]);
  const [readingLoader, setReadingLoader] = useState<boolean>(false);
  const limits: {
    soilMoisture: {
      min: number;
      max: number;
    };
    temperature: {
      min: number;
      max: number;
    };
    waterFlow: {
      min: number;
      max: number;
    };
  } = {
    soilMoisture: {
      min: 0,
      max: 100,
    },
    temperature: {
      min: 0,
      max: 100,
    },
    waterFlow: {
      min: 0,
      max: 5,
    },
  };
  const randomBetween = (min: number, max: number, decimals = 0) => {
    const value = Math.random() * (max - min) + min;
    return Number(value.toFixed(decimals));
  };
  useEffect(() => {
    const generateData = async () => {
      const data = {
        soilMoisture: randomBetween(
          limits.soilMoisture.min,
          limits.soilMoisture.max,
        ),
        temperature: randomBetween(
          limits.temperature.min,
          limits.temperature.max,
        ),
        waterFlow: randomBetween(limits.waterFlow.min, limits.waterFlow.max, 2),
      };
      try {
        await sendRequest("api/readings", "POST", {
          ...data,
          deviceId: id,
        }).then((result) => {
          const resData = result.data as Data<null> | undefined;
          if (result && result.success && resData && resData.status) {
            setReadings((prev) => {
              if (prev.length > 10) {
                const after = prev.slice(0, 8);
                return [data, ...after];
              } else {
                return [data, ...prev];
              }
            });
            setReadingLoader(true);
            if (status == "error") {
              clearInterval(interval);
              toast.error("Currently your device on Error, Kindly resolve it");
            }
            if (status == "offline") {
              dispatch(devicePowerON(id));
            }
          } else {
            throw new Error(resData?.message || "Failed to send Reading");
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          const msg = error.message;
          toast.error(msg);
          setSimulation(false);
        }
      }
    };
    setReadingLoader(true);
    const interval = setInterval(() => {
      generateData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!simulation) {
      setReadings([]);
    }
  }, [simulation]);
  return (
    simulation &&
    readings && (
      <div className="fixed right-0 bg-black text-white flex flex-col min-w-40 max-w-50 max-h-60 rounded-l-md p-4 overflow-hidden">
        {readings.length == 0 && <HorizontalBar position="top-0" />}
        <div className="grid grid-cols-3 place-items-start justify-items-center gap-2 font-bold">
          <p>S</p>
          <p>T</p>
          <p>W</p>
        </div>
        <div
          className={`bg-gray-400 animate-pulse rounded-md w-9/10 self-center my-1 min-h-0.5 ${readingLoader ? "block" : "hidden"}`}
        ></div>
        {readings.length > 0 &&
          readings.map((item, i) => (
            <div
              key={`atRight/SimulationReading/${i}`}
              className="grid grid-cols-3 place-items-start justify-items-center gap-2"
            >
              <p>{item.soilMoisture}</p>
              <p>{item.temperature}</p>
              <p>{item.waterFlow}</p>
            </div>
          ))}
      </div>
    )
  );
}
