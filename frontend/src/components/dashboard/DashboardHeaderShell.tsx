"use client";

import { useState } from "react";
import MainHeader from "../repeated/MainHeader";

export default function DashboardHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBar, setSideBar] = useState<boolean>(false);
  return (
    <section className="relative w-full h-screen bg-bgprimary">
      <MainHeader setSideBar={setSideBar} title="Dashboard" type="dashboard" />
      <section className="relative m-auto h-full w-full p-6 space-y-6 overflow-y-auto pt-16">
        {children}
      </section>
    </section>
  );
}
