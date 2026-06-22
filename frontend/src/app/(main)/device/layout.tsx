import DeviceHeaderShell from "@/components/device/DeviceHeaderShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriFlow - Devices",
  description:
    "Device section to add, view, delete and modify device",
};

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DeviceHeaderShell>{children}</DeviceHeaderShell>;
}
