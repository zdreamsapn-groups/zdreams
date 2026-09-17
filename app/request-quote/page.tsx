"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Mail, MessageCircle } from "lucide-react";

import OrderForm from "@/components/forms/OrderForm";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const steps = [
  {
    title: "Tell us what you need",
    description: "Pick a product and share your details.",
  },
  {
    title: "We craft your quote",
    description: "Our team prepares a tailored quotation within 24 hours.",
  },
  {
    title: "Approve & get started",
    description: "Confirm the price and we begin your order.",
  },
];

export default function RequestQuotePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16">
      <div className="relative mx-auto max-w-6xl px-6">

        {/* Compact Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            Free Quote
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 lg:text-5xl">
            Request Your Quote
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
            Customized mugs or event websites — tell us what you need and
            we&apos;ll respond within 24 hours.
          </p>
        </motion.div>

        {/* Form + Sidebar */}
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-3">

          {/* Order Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2"
          >
            <OrderForm />
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >

            {/* How it works */}
            <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                How it works
              </h2>

              <div className="mt-6 space-y-6">
                {steps.map((step, index) => (
                  <div key={step.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                      {index + 1}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guarantees */}
            <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">
                Why request a quote?
              </h2>

              <ul className="mt-5 space-y-3">
                {[
                  "No payment needed — quotes are 100% free",
                  "Personalized pricing for your order",
                  "Bulk mug orders & event website packages",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="rounded-3xl bg-gradient-to-r from-amber-600 to-yellow-500 p-7 text-white shadow-sm">
              <h2 className="text-lg font-bold">
                Prefer to talk directly?
              </h2>

              <p className="mt-3 text-sm leading-6 text-amber-100">
                Reach us anytime for questions about your order.
              </p>

              <a
                href="mailto:zdreams.apn@gmail.com"
                className="mt-5 flex items-center gap-3 font-semibold"
              >
                <Mail className="h-5 w-5" />
                zdreams.apn@gmail.com
              </a>

              <a
                href="https://wa.me/7200535609"
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-3 font-semibold"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp us
              </a>
            </div>

          </motion.aside>

        </div>

      </div>
    </main>
  );
}