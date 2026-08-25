"use client";

import { useEffect, useState } from "react";
import MainHeader from "../repeated/MainHeader";
import DeviceLoading from "./DeviceLoading";

export default function DeviceHeaderShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sideBar, setSideBar] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <DeviceLoading />;
  }
  return (
    <section className="relative w-full h-screen bg-bgsecondary">
      <MainHeader
        setSideBar={setSideBar}
        title="Device"
        type="device"
        bgcolor={true}
        targetID={"deviceFeatures"}
      />
      <section className="relative h-screen w-full overflow-y-auto">
        {children}
      </section>
    </section>
  );
}
