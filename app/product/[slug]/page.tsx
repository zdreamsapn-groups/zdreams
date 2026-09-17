import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  ShoppingBag,
  Globe,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";

import { products } from "@/data/products";
import CtaBanner from "@/components/ui/CtaBanner";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16">
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"></div>
      <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-yellow-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-6">

        <Link
          href="/product"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 transition hover:-translate-x-1 hover:text-amber-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">

          {/* ============ IMAGE CARD ============ */}
          <div className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <div className="flex h-96 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
              <Image
                src={product.image}
                alt={product.name}
                width={320}
                height={320}
                priority
                className="h-auto max-h-[340px] w-auto object-contain"
              />
            </div>

            {/* Highlights */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-amber-100">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-gray-900">
                  Premium
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">Quality</p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                  <Globe className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-gray-900">
                  Global
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">Shipping</p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-center">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                  <Truck className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="mt-2 text-sm font-bold text-gray-900">
                  Fast
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">Delivery</p>
              </div>
            </div>
          </div>

          {/* ============ PRODUCT DETAILS ============ */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                {product.category}
              </span>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  product.type === "digital"
                    ? "bg-violet-100 text-violet-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {product.type}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 lg:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Price */}
            <div className="mt-8 rounded-2xl border border-green-100 bg-green-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-700">
                Starting Price
              </p>

              <div className="mt-1 flex flex-wrap items-end gap-3">
                <h2 className="text-4xl font-extrabold text-green-600">
                  ${Number(product.price).toFixed(2)}
                </h2>

                {product.type === "physical" && (
                  <span className="pb-1 text-sm font-medium text-green-700">
                    + $17.99 delivery
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm text-gray-600">
                {product.type === "digital"
                  ? "Final quotation depends on pages and features."
                  : "Final quotation depends on quantity and customization. Delivery adds $17.99."}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/request-quote"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <ShoppingBag className="h-4 w-4" />
                Request Quote
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-amber-600 hover:text-amber-600"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-14 rounded-3xl border border-amber-100 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Product Information
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Category</p>
              <h3 className="mt-1 text-sm font-bold text-gray-900">
                {product.category}
              </h3>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Custom Printing</p>
              <h3 className="mt-1 text-sm font-bold text-gray-900">
                Available
              </h3>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Minimum Order</p>
              <h3 className="mt-1 text-sm font-bold text-gray-900">
                Contact Us
              </h3>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs text-gray-500">Shipping</p>
              <h3 className="mt-1 text-sm font-bold text-gray-900">
                {product.type === "digital"
                  ? "Instant (Digital)"
                  : "Worldwide + $17.99"}
              </h3>
            </div>
          </div>
        </div>

        {/* Features */}
        {product.features?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900">
              Product Features
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Why Choose ZDreams */}
        <section className="mt-16 rounded-3xl border border-amber-100 bg-white p-8 shadow-sm">
          <div className="text-center">
            <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
              Why Choose Us
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Why Customers Love ZDreams
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
              Every customized product is crafted with precision, premium
              materials, and vibrant printing technology.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-white shadow-md">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Premium Customization
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Add names, photos, logos, artwork or any personalized
                design to every product.
              </p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-green-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 text-white shadow-md">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Fast Delivery
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Reliable production, secure packaging, and worldwide
                shipping with excellent support.
              </p>
            </div>

            <div className="rounded-2xl border border-yellow-100 bg-yellow-50/40 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500 to-orange-400 text-white shadow-md">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Premium Quality
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                High-quality materials with advanced printing technology
                for vibrant, long-lasting results.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12">
          <CtaBanner
            title="Ready to Customize This Product?"
            description="Upload your logo, artwork, or design and receive a personalized quotation from our expert team."
            primaryLabel="Get Free Quote"
          />
        </div>

      </div>
    </main>
  );
}