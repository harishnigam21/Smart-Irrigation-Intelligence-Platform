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
    <section className="relative w-full h-screen bg-bgprimary">
      <MainHeader setSideBar={setSideBar} title="Device" type="device" />
      <section className="relative m-auto h-screen w-full p-6 space-y-6 overflow-y-auto pt-16">
        {children}
      </section>
    </section>
  );
}
