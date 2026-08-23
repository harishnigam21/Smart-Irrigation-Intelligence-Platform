import FarmHeaderShell from "@/components/farm/FarmHeaderShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriFlow - Farms",
  description:
    "Farm section to add, view, delete and modify farms",
};

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <FarmHeaderShell>{children}</FarmHeaderShell>;
}
