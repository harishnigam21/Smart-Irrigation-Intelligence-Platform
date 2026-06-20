import DashboardHeaderShell from "@/components/dashboard/DashboardHeaderShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriFlow - Dashboard",
  description:
    "Dashboard that list sensor,devices, farms info and readings for analysis",
};

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardHeaderShell>{children}</DashboardHeaderShell>;
}
