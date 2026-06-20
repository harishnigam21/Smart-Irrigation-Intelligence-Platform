"use client"
import { setSummary, Summary } from "@/store/slices/SummarySlice";
import { useAppDispatch } from "@/store/Store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SummaryData({ data }: { data: Summary | null }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    try {
      if (data) {
        dispatch(setSummary(data));
        if (data.farms.length == 0) {
          router.push("/farm?message=You don't have any farms");
        }
      } else {
        throw new Error("Failed to fetch sumary");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error?.message || "Failed to fetch summary");
      }
      console.error(error);
    }
  }, []);
  return null;
}
