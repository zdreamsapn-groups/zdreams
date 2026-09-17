"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

import { products } from "@/data/products";

export default function FeaturedProducts() {
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
            Featured Collection
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl">
            Crafted Just For You
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
            Personalized mugs and custom event websites — crafted around
            your ideas.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <span
                  className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow ${
                    product.type === "digital"
                      ? "bg-violet-600"
                      : "bg-blue-600"
                  }`}
                >
                  {product.type}
                </span>

                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <span className="text-sm font-bold text-green-600">
                    From ${product.price.toFixed(2)}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                    {product.category}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-gray-900">
                  {product.name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                  {product.description}
                </p>

                <Link
                  href={`/product/${product.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-amber-700"
                >
                  View Details
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/product"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 transition-all duration-300 hover:translate-x-1"
          >
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}