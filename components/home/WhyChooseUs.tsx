"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Sparkles,
  PackageCheck,
  Mail,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    title: "Worldwide Delivery",
    description:
      "Shipping premium customized products to customers across the globe with secure packaging.",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "100% Personalized",
    description:
      "Every order is uniquely customized with your logo, artwork, photos or personal message.",
    icon: Sparkles,
    color: "from-amber-500 to-yellow-400",
  },
  {
    title: "Premium Quality",
    description:
      "High-quality materials, vibrant printing and strict quality control for every product.",
    icon: PackageCheck,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Easy Ordering",
    description:
      "Submit your request online and our team will contact you quickly to finalize your order.",
    icon: Mail,
    color: "from-pink-500 to-rose-500",
  },
];

export default function WhyChooseUs() {
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
            Why Choose Us
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
            Why Customers Love ZDreams
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
            We transform your creative ideas into premium customized
            products with craftsmanship, fast service, and reliable
            worldwide delivery.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group rounded-3xl border border-amber-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div
                  className={`inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3.5 text-white shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Trusted Quality
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}