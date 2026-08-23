"use client";

import { useState } from "react";
import MainHeader from "../repeated/MainHeader";

export default function DeviceHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBar, setSideBar] = useState<boolean>(false);
  return (
    <section className="relative w-full h-screen bg-bgsecondary">
      <MainHeader
        setSideBar={setSideBar}
        title="Device"
        type="device"
        bgcolor={true}
      />
      <section className="relative h-screen w-full overflow-y-auto">
        {children}
      </section>
    </section>
  );
}
