"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { products } from "@/data/products";
import PageHeader from "@/components/ui/PageHeader";
import CtaBanner from "@/components/ui/CtaBanner";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-amber-50 to-yellow-100">
          <p className="text-sm font-semibold text-amber-600">
            Loading products...
          </p>
        </main>
      }
    >
      <ProductContent />
    </Suspense>
  );
}

function ProductContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") ?? "";
  const [query, setQuery] = useState(search);

  const filteredProducts = useMemo(() => {
    if (!search) return products;

    const keyword = search.toLowerCase();

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword)
    );
  }, [search]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16"
    >
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"></div>
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-6">

        <PageHeader
          badge="Premium Collection"
          title="Our Products"
          subtitle="Premium customized mugs and beautiful event websites, designed for gifts, branding and personal use."
        />

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 w-full max-w-xl"
        >
          <div className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-white px-4 py-3 shadow-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100">
            <Search className="h-5 w-5 shrink-0 text-amber-600" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                const value = e.target.value.trim();
                router.replace(
                  value
                    ? `/product?search=${encodeURIComponent(value)}`
                    : "/product",
                  { scroll: false }
                );
              }}
              placeholder="Search mugs, websites, invitations..."
              className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  router.replace("/product", { scroll: false });
                }}
                aria-label="Clear search"
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500 transition hover:bg-amber-100 hover:text-amber-700"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Search Results Banner */}
        {search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-10 flex w-fit items-center gap-3 rounded-2xl border border-amber-200 bg-white px-5 py-3 shadow-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
              <Search className="h-4 w-4 text-amber-600" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-gray-900">
                Search Results
              </h2>
              <p className="text-xs text-gray-500">
                Showing results for
                <span className="ml-1 font-semibold text-amber-600">
                  &quot;{search}&quot;
                </span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-sm"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Search className="h-8 w-8 text-amber-600" />
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Products Found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
                We couldn&apos;t find any products matching your search.
                Try another keyword or browse all products.
              </p>

              <Link
                href="/product"
                className="mt-6 inline-flex rounded-xl bg-amber-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-700"
              >
                View All Products
              </Link>
            </motion.div>
          ) : (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="h-auto max-h-[180px] w-auto object-contain"
                    />
                  </motion.div>
                </div>

                <div className="border-t p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                      {product.category}
                    </span>

                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                        product.type === "digital"
                          ? "bg-violet-100 text-violet-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {product.type}
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-gray-900">
                    {product.name}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>

                    <Link
                      href={`/product/${product.slug}`}
                      className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <CtaBanner
            title="Looking for Custom Products?"
            description="We craft personalized mugs and design beautiful event websites for weddings, birthdays, baby showers — with worldwide delivery."
          />
        </div>

      </div>
    </motion.main>
  );
}