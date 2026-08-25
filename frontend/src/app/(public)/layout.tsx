import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AgriFlow - Home",
  description: "A Quich View of full Smart Irrigation System",
};

export default function publicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-linear-to-br from-pri/60 via-ter/60 to-pri/60 flex flex-col text-textPri">
      <header className="flex justify-between max-w-full items-center px-8 py-4 border-b-[0.1px] gap-4 border-borderhover backdrop-blur-md blueprint-grid">
        <h1 className="text-2xl font-bold tracking-wide text-white">AgriFlow</h1>
        <div className=" hidden sm:flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl border border-borderhover font-bold hover:bg-borderhover/20 transition"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2 rounded-xl bg-pri/80 font-bold text-black hover:bg-pri transition"
          >
            Dashboard
          </Link>
        </div>
      </header>
      <section className="w-full h-screen overflow-x-hidden overflow-y-auto">{children}</section>
    </div>
  );
}
