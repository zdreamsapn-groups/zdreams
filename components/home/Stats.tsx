"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  PackageCheck,
  Globe2,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    value: "100%",
    label: "Customized Products",
    icon: Sparkles,
  },
  {
    value: "3+",
    label: "Product Lines",
    icon: PackageCheck,
  },
  {
    value: "50+",
    label: "Countries Served",
    icon: Globe2,
  },
  {
    value: "Premium",
    label: "Quality Materials",
    icon: ShieldCheck,
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-14">
      <div className="relative mx-auto max-w-6xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Why Choose ZDreams
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
            Trusted Worldwide
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
            Personalized mugs and event websites, crafted with premium
            quality and reliable delivery anywhere on earth.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-amber-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-white shadow-md">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-3xl font-extrabold text-amber-600">
                  {stat.value}
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}