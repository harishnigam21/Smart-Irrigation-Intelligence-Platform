import { CheckCircle, ListTodo, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-1 px-6 py-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Manage Farms
          <br />
          <span className="text-gray-400">Like a Pro ⚡</span>
        </h2>

        <p className="text-gray-400 max-w-xl mb-8 text-lg">
          Stay focused, organized, and productive with a minimal yet powerful
          smart Irrigation System system built for consistensy.
        </p>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-bgprimary/75 text-text hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-primary hover:bg-primary/20 transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-8 pb-20">
        {[
          {
            icon: <ListTodo />,
            title: "Organize Farms",
            desc: "Add, update, and delete farm data effortlessly.",
          },
          {
            icon: <Zap />,
            title: "Blazing Fast",
            desc: "Real Time Sensor Data at you dashboard.",
          },
          {
            icon: <CheckCircle />,
            title: "Stay Consistent",
            desc: "Track progress and manage your farm with smart irrigation.",
          },
        ].map((item, i) => (
          <div
            key={`home/card/${i}`}
            className="rounded-2xl bg-primary/30 backdrop-blur p-6 hover:scale-105 transition"
          >
            <div className="mb-4 text-tertiary">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-secondary text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
}
