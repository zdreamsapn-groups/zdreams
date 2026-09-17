"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Building2,
  Clock,
} from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"></div>
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-6">

        <PageHeader
          badge="Contact ZDreams"
          title="Contact Our Team"
          subtitle="Questions about customized gifts, wholesale orders, or partnerships? Our team is always ready to help."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">

          {/* Company Information */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl border border-amber-100 bg-white p-7 shadow-sm"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-gray-900">
              Company Information
            </h2>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-4">
                <Building2 className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Company
                  </p>
                  <p className="text-sm text-gray-600">ZDreams</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Building2 className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Parent Company
                  </p>
                  <p className="text-sm text-gray-600">APN Groups</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Email
                  </p>
                  <a
                    href="mailto:zdreams.apn@gmail.com"
                    className="text-sm text-amber-700 hover:underline"
                  >
                    zdreams.apn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Phone
                  </p>
                  <p className="text-sm text-gray-600">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MessageCircle className="mt-0.5 h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/7200535609"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-amber-700 hover:underline"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Globe className="mt-0.5 h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Worldwide Shipping
                  </p>
                  <p className="text-sm text-gray-600">
                    We deliver customized products worldwide.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-sm">
              <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-gray-900">
                <Clock className="h-5 w-5 text-amber-600" />
                Business Hours
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">
                    Monday - Friday
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    09:00 AM - 06:00 PM
                  </span>
                </div>

                <div className="flex justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">
                    Saturday
                  </span>
                  <span className="text-sm font-semibold text-amber-600">
                    09:00 AM - 01:00 PM
                  </span>
                </div>

                <div className="flex justify-between rounded-xl bg-gray-50 px-4 py-3">
                  <span className="text-sm font-medium text-gray-700">
                    Sunday
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    09:00 AM - 12:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <motion.div
              className="mt-6 flex-1 rounded-3xl bg-gradient-to-r from-amber-600 to-yellow-500 p-7 text-white shadow-lg"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-extrabold tracking-tight">
                Need a Custom Product?
              </h3>

              <p className="mt-3 text-sm leading-6 text-amber-100">
                Upload your logo, artwork or design and receive a
                personalized quotation from our team within 24 hours.
              </p>

              <a
                href="/request-quote"
                className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-amber-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
              >
                Request a Free Quote
              </a>
            </motion.div>
          </motion.div>

        </div>

        {/* Quick Response */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 rounded-2xl border border-amber-200 bg-white px-6 py-5 shadow-sm"
        >
          <h3 className="text-base font-bold text-amber-700">
            Quick Response
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            We typically reply to emails and quotation requests within{" "}
            <strong>24 hours</strong>. For urgent inquiries, contact us
            directly through WhatsApp.
          </p>
        </motion.div>

      </div>
    </main>
  );
}