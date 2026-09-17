"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Coffee,
  MonitorSmartphone,
  MailPlus,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    title: "Mugs",
    icon: Coffee,
    description:
      "Premium personalized and custom mugs with photo, logo, and name printing.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Website Design",
    icon: MonitorSmartphone,
    description:
      "Beautiful event websites for weddings, birthdays, baby showers and more.",
    color: "from-violet-400 to-purple-500",
  },
  {
    title: "Event Invitations",
    icon: MailPlus,
    description:
      "Custom digital invitations for weddings, birthdays, baby showers and all special occasions.",
    color: "from-pink-400 to-rose-500",
  },
];

export default function Categories() {
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
            Product Collection
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
            Explore Our Products
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
            Customized mugs, stunning event websites, and digital
            invitations — physical and digital creations built around you.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-amber-100 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${category.color} p-4 text-white shadow-md`}
                >
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {category.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {category.description}
                </p>

                <Link
                  href="/product"
                  className="mt-5 inline-flex items-center text-sm font-semibold text-amber-600 transition-all duration-300 group-hover:translate-x-1"
                >
                  Explore
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}