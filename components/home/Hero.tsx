"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100">
      <motion.div
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-yellow-300/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Premium Customized Gifts
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-gray-900 lg:text-5xl">
            Turn Your
            <span className="block text-amber-600">
              Ideas Into Reality
            </span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
            ZDreams creates premium customized mugs, beautiful event
            websites, and custom digital invitations for weddings,
            birthdays, baby showers, and all your special occasions.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/request-quote"
              className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-amber-600 hover:text-amber-600"
            >
              Request Quote
            </Link>
          </div>

          {/* Compact Stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["50+", "Happy Customers"],
              ["3+", "Product Lines"],
              ["10+", "Countries Served"],
              ["24/7", "Support"],
            ].map(([title, subtitle]) => (
              <div
                key={title}
                className="rounded-2xl border border-amber-100 bg-white px-4 py-3 text-center shadow-sm"
              >
                <h3 className="text-2xl font-bold text-amber-600">
                  {title}
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  {subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
            <Globe className="h-4 w-4 text-green-600" />
            Premium Mugs, Websites & Invitations — Worldwide
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="ZDreams Customized Products"
              width={500}
              height={0}
              priority
              className="h-auto w-full rounded-2xl object-contain"
            />
          </div>

          {/* Starting Price */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 top-8 rounded-xl border border-amber-100 bg-white px-4 py-2.5 shadow-lg"
          >
            <p className="text-xs text-gray-500">Mugs From</p>
            <h3 className="text-2xl font-bold text-green-600">$25.99</h3>
          </motion.div>

          {/* Rating */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 bottom-8 rounded-xl border border-amber-100 bg-white px-4 py-2.5 shadow-lg"
          >
            <p className="text-xs text-gray-500">⭐ Customer Rating</p>
            <h3 className="text-2xl font-bold text-amber-500">4.9/5</h3>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}