
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
  
  
  return (
    <div className=" flex flex-col">
      <header className="fixed top-0 left-0 z-50 flex justify-between w-full items-center px-8 py-4 border-b-[0.1px] gap-4 border-primary backdrop-blur-xl">
        <h1 className="text-2xl font-bold tracking-wide">AgriFlow</h1>
      </header>
      {children}
    </div>
  );
}
