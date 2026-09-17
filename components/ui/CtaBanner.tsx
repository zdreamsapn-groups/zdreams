"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type CtaBannerProps = {
  title: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
};

export default function CtaBanner({
  title,
  description,
  primaryLabel = "Request Free Quote",
  secondaryLabel = "Contact Us",
  primaryHref = "/request-quote",
  secondaryHref = "/contact",
}: CtaBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 px-8 py-12 text-center text-white shadow-lg"
    >
      <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-amber-100">
          {description}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href={primaryHref}
          className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-amber-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
        >
          {primaryLabel}
        </Link>

        <Link
          href={secondaryHref}
          className="rounded-xl border-2 border-white px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-amber-600"
        >
          {secondaryLabel}
        </Link>
      </div>
    </motion.div>
  );
}