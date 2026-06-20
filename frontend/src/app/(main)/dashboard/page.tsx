import FarmSlider from "@/components/dashboard/FarmSlider";
import SummaryReadings from "@/components/dashboard/SummaryReadings";
import SummarySlider from "@/components/dashboard/SummarySlider";
export const VALID_SOIL_TYPES = [
  "NA",
  "alluvial soil",
  "red soil",
  "black soil (regur)",
  "forest & mountain soil",
  "arid & desert soil",
  "laterite soil",
  "saline & alkaline soil",
  "peaty & marshy soil",
] as const;
export type soilType = (typeof VALID_SOIL_TYPES)[number];
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default async function Dashboard() {
  await delay(1000);

  return (
    <>
      {/* summary slider */}
      <SummarySlider />
      {/* Farm Slider */}
      <FarmSlider />
      {/* Readings */}
      <SummaryReadings />
    </>
  );
}
