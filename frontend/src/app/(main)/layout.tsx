import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import ScreenSize from "@/components/Imp/ScreenSize";
import { serverFetch } from "@/utils/serverApi";
import { Data } from "@/types/data";
import { User } from "@/types/user";
import UserInfo from "@/components/data/UserInfo";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgriFlow",
  description: "Smart Irrigation System : A Farmer Platform",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await serverFetch("api/user", "GET");
  const data = response.data as Data<User> | null;
  return (
    <main>
      {response.status && <UserInfo userInfo={data?.data || null} />}
      <ScreenSize />
      {children}
      <Toaster position="top-center" />
    </main>
  );
}
