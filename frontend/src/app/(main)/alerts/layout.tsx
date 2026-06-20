import AlertHeaderShell from "@/components/alert/AlertHeaderShell";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AgriFlow - Alerts",
  description: "A Platdorm, all sensor alerts are listed",
};

export default async function alertLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full h-screen bg-bgprimary">
      <AlertHeaderShell>{children}</AlertHeaderShell>
    </section>
  );
}
