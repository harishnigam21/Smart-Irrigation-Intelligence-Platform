"use client";
import { DeviceInSummary } from "@/store/slices/SummarySlice";
import { useAppSelector } from "@/store/Store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import FarmVisual from "../Imp/FarmVisual";
import { useRouter } from "next/navigation";

export default function FarmSlider() {
  const summary = useAppSelector((store) => store.summary);
  const [farms, setFarms] = useState<
    {
      devices: DeviceInSummary[];
      _id: string;
      nickName: string;
      soilType: string;
      info: {
        points: [number, number][];
      };
    }[]
  >([]);
  const [selectedFarmSlide, setSelectedFarmSlide] = useState<{
    type: "device" | "farm";
    index: number;
    deviceTarget?: number;
  }>({ type: "farm", index: 0 });
  const farmDevice = useMemo(() => {
    const calculate = summary.farms.map((item) => ({
      ...item,
      devices: summary.device.filter((initem) => initem.farmId === item._id),
    }));
    setFarms(calculate);
  }, [summary.farms, summary.device]);
  const router = useRouter();
  return farms && farms.length > 0 ? (
    <article className="relative max-h-screen bg-bgsecondary rounded-xl py-4">
      <h2 className="mb-2 text-xl lg:text-2xl px-4">
        Farm{" "}
        <span className="text-tertiary">
          ({farms[selectedFarmSlide.index].nickName})
        </span>
      </h2>
      <article className="w-full flex justify-center-safe">
        <div className="w-full flex flex-col justify-center gap-3">
          <div className="flex flex-nowrap gap-8 w-full overflow-x-auto">
            <div
              key={`farm/representation/${selectedFarmSlide.index}`}
              className="w-full h-full flex flex-col justify-between gap-4"
            >
              <div className="w-full overflow-x-auto flex flex-nowrap items-center whitespace-nowrap scrollbar-none gap-2 px-4">
                {farms[selectedFarmSlide.index].devices.length > 0 ? (
                  farms[selectedFarmSlide.index].devices.map((item, index) => (
                    <small
                      key={`farm/listedDevice/${index}`}
                      className="px-2 text-[10px] py-1 sm:px-3 sm:text-xs rounded-full bg-tertiary hover:bg-tertiary/75 transition-all text-black font-semibold cursor-pointer"
                      onClick={() =>
                        setSelectedFarmSlide((prev) => ({
                          ...prev,
                          type: "device",
                          deviceTarget: index,
                        }))
                      }
                    >
                      {item.nickName}
                    </small>
                  ))
                ) : (
                  <small className="md:py-1 md:px-3 rounded-full bg-borderhover text-white font-medium">
                    No device Found
                  </small>
                )}
              </div>
              <div className="w-full flex justify-center">
                <div
                  className="absolute self-center left-0 bg-bgprimary py-4 rounded-r-xl z-10 cursor-pointer"
                  onClick={() => {
                    if (selectedFarmSlide.index == 0) {
                      setSelectedFarmSlide({
                        type: "farm",
                        index: farms.length - 1,
                      });
                    } else {
                      setSelectedFarmSlide((prev) => ({
                        type: "farm",
                        index: prev.index - 1,
                      }));
                    }
                  }}
                >
                  <ChevronLeft className="text-tertiary" />
                </div>
                <FarmVisual
                  points={farms[selectedFarmSlide.index].info.points}
                  devices={
                    selectedFarmSlide.type == "farm"
                      ? farms[selectedFarmSlide.index].devices.map((item) => ({
                          id: item._id,
                          coords: item.farmPoint,
                          label: item.nickName,
                          status: item.hardware.telemetrySummary.status,
                        }))
                      : [
                          {
                            id: farms[selectedFarmSlide.index].devices[
                              selectedFarmSlide?.deviceTarget || 0
                            ]._id,
                            coords:
                              farms[selectedFarmSlide.index].devices[
                                selectedFarmSlide?.deviceTarget || 0
                              ].farmPoint,
                            label:
                              farms[selectedFarmSlide.index].devices[
                                selectedFarmSlide?.deviceTarget || 0
                              ].nickName,
                            status:
                              farms[selectedFarmSlide.index].devices[
                                selectedFarmSlide?.deviceTarget || 0
                              ].hardware.telemetrySummary.status,
                          },
                        ]
                  }
                />
                <div
                  className="absolute self-center right-0 bg-bgprimary py-4 rounded-l-xl z-10 cursor-pointer"
                  onClick={() => {
                    if (farms.length == selectedFarmSlide.index + 1) {
                      setSelectedFarmSlide({
                        type: "farm",
                        index: 0,
                      });
                    } else {
                      setSelectedFarmSlide((prev) => ({
                        type: "farm",
                        index: prev.index + 1,
                      }));
                    }
                  }}
                >
                  <ChevronRight className="text-tertiary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <div className="flex items-center justify-center px-4">
        {farms.map((item, index) => (
          <div
            key={`farm/slide/dot/${index}`}
            className={`group flex items-center w-5 h-5 justify-center p-1 cursor-pointer`}
            onClick={() =>
              setSelectedFarmSlide({
                type: "farm",
                index: index,
              })
            }
          >
            <p
              className={`w-full h-1 ${index == selectedFarmSlide.index ? "bg-border" : "bg-borderhover"} group-hover:bg-border transition-all`}
            ></p>
          </div>
        ))}
      </div>
    </article>
  ) : (
    <article className="bg-bgsecondary rounded-xl p-4 flex justify-between">
      <h2 className="mb-2 text-xl lg:text-2xl px-4">
        Farms : <span className="text-red-500">No Farms Found !</span>
      </h2>
      <div
        className="py-2 px-4 rounded-full bg-tertiary text-black font-semibold cursor-pointer hover:bg-tertiary/80 hover:scale-105"
        onClick={() => {
          router.push("/farm");
        }}
      >
        Add Farm
      </div>
    </article>
  );
}
