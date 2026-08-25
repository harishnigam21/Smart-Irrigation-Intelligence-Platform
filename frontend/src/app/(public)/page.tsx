import { CheckCircle, ListTodo, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="blueprint-grid">
      {/* Hero Section */}
      <article className="flex flex-col items-center justify-center text-center text-textPri flex-1 px-6 py-16 ">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Manage Farms
          <br />
          <span className="text-textSec">Like a Pro ⚡</span>
        </h2>

        <p className="text-textPri/80 max-w-xl mb-8 text-lg">
          Stay focused, organized, and productive with a minimal yet powerful
          smart Irrigation System system built for consistensy.
        </p>

        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-pri/80 font-bold text-black hover:bg-pri transition"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-borderhover hover:bg-borderhover/20 transition font-bold"
          >
            Login
          </Link>
        </div>
      </article>

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
            className="rounded-2xl bg-bgprimary/20 backdrop-blur p-6 hover:scale-105 border border-borderhover transition"
          >
            <div className="mb-4 text-borderhover">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-textPri text-sm">{item.desc}</p>
          </div>
        ))}
      </section>
    </section>
  );
}
