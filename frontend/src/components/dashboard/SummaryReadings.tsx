"use client";
import { useAppSelector } from "@/store/Store";
import { getDaysBetween } from "@/utils/getDate";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SummaryReadings() {
  const summary = useAppSelector((store) => store.summary);
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return summary.reading.data && summary.reading.data.length > 0 ? (
    <article className="bg-bgsecondary rounded-xl p-4 flex flex-col mt-4">
      <h2 className="mb-2 text-xl lg:text-2xl px-4">
        Reading
        <span className="border border-border rounded-full px-1 py-0.2 text-[8px] animate-pulse">
          Live
        </span>
      </h2>
      <div className="w-full overflow-x-auto rounded-lg border border-txlight/20">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-txlight/20 bg-txlight/5">
              <th className="px-4 py-2 text-left border-r border-txlight/20 whitespace-nowrap">
                Device
              </th>
              <th className="px-4 py-2 text-center border-r border-txlight/20 whitespace-nowrap">
                Moisture
              </th>
              <th className="px-4 py-2 text-center border-r border-txlight/20 whitespace-nowrap">
                WaterFlow
              </th>
              <th className="px-4 py-2 text-center border-r border-txlight/20 whitespace-nowrap">
                Temperature
              </th>
              <th className="px-4 py-2 text-center border-r border-txlight/20 whitespace-nowrap">
                Received At
              </th>
            </tr>
          </thead>
          <tbody>
            {summary.reading.data.map((item, index) => (
              <tr
                key={`dashboard/reading/listed/${index}`}
                className="border-b border-txlight/20 last:border-0"
              >
                <td className="px-4 py-2 border-r border-txlight/20 whitespace-nowrap">
                  {item.deviceId.nickName}
                </td>
                <td className="px-4 py-2 border-r text-center border-txlight/20 whitespace-nowrap">
                  {item.soilMoisture}
                </td>
                <td className="px-4 py-2 border-r text-center border-txlight/20 whitespace-nowrap">
                  {item.temperature}
                </td>
                <td className="px-4 py-2 border-r text-center border-txlight/20 whitespace-nowrap">
                  {item.waterFlow}
                </td>
                <td className="px-4 py-2 border-r text-center border-txlight/20 whitespace-nowrap">
                  {getDaysBetween(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  ) : (
    <article className="bg-bgsecondary rounded-xl p-4 flex justify-between">
      <h2 className="mb-2 text-xl lg:text-2xl px-4">
        Farms : <span className="text-red-500">No Readings</span>
      </h2>
      <div
        className="py-2 px-4 rounded-full bg-tertiary text-black font-semibold cursor-pointer hover:bg-tertiary/80 hover:scale-105"
        onClick={() => {
          router.push("/farm");
        }}
      >
        Activate Devices
      </div>
    </article>
  );
}
