import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import ScreenSize from "@/components/Imp/ScreenSize";
import { serverFetch } from "@/utils/serverApi";
import { Data } from "@/types/data";
import { User } from "@/types/user";
import UserInfo from "@/components/data/UserInfo";
import { Summary } from "@/store/slices/SummarySlice";
import SummaryData from "@/components/data/SummaryData";

export const metadata: Metadata = {
  title: "AgriFlow",
  description: "Smart Irrigation System : A Farmer Platform",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const responseUser = await serverFetch("api/user", "GET");
  const dataUser = responseUser.data as Data<User> | null;
  const responseSummary = await serverFetch("api/summary", "GET");
  const dataSummary = responseSummary.data as Data<Summary> | null;
  return (
    <main>
      {responseUser.status && <UserInfo userInfo={dataUser?.data || null} />}
      {responseSummary.status && (
        <SummaryData data={dataSummary?.data || null} />
      )}
      <ScreenSize />
      {children}
      <Toaster position="top-center" />
    </main>
  );
}
