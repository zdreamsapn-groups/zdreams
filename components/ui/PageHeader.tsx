"use client";

import { motion } from "framer-motion";

type PageHeaderProps = {
  badge: string;
  title: string;
  subtitle?: string;
};

export default function PageHeader({
  badge,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
        {badge}
      </span>

      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 lg:text-5xl">
        {title}
      </h1>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}