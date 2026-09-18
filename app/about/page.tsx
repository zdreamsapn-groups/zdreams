"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Award,
  Users,
  Gift,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { company } from "@/data/company";
import PageHeader from "@/components/ui/PageHeader";
import CtaBanner from "@/components/ui/CtaBanner";

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16">

      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"></div>
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-6">

        <PageHeader
          badge="About Our Company"
          title={`Welcome to ${company.name}`}
          subtitle={company.tagline}
        />

        {/* Company + Mission */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.section
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl border border-amber-100 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Who We Are
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              ZDreams is a premium customized gift manufacturer operated by
              APN Groups.

              <br /><br />

              We specialize in creating customized mugs and beautiful event
              websites for weddings, birthdays, baby showers and all your
              special occasions.

              <br /><br />

              Every item is manufactured using premium materials, advanced
              printing technology and strict quality control to ensure
              complete customer satisfaction.
            </p>
          </motion.section>

          <motion.section
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-3xl border border-amber-100 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Our Mission
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              Our mission is to transform your memories, creativity and
              ideas into premium customized gifts that people will treasure
              forever.

              <br /><br />

              We focus on quality craftsmanship, affordable pricing,
              worldwide delivery and exceptional customer service.
            </p>
          </motion.section>
        </div>

        {/* Statistics */}
        <section className="mt-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Users className="mx-auto h-6 w-6 text-amber-600" />,
                title: "1000+",
                subtitle: "Happy Customers",
              },
              {
                icon: <Gift className="mx-auto h-6 w-6 text-amber-600" />,
                title: "3+",
                subtitle: "Product Lines",
              },
              {
                icon: <Globe className="mx-auto h-6 w-6 text-amber-600" />,
                title: "50+",
                subtitle: "Countries Served",
              },
              {
                icon: <Award className="mx-auto h-6 w-6 text-amber-600" />,
                title: "100%",
                subtitle: "Premium Quality",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-amber-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  {item.icon}
                </div>

                <h3 className="mt-4 text-3xl font-extrabold text-amber-600">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-600">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mt-12">
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

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900">
              Why Choose ZDreams?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-gray-600">
              Premium customized products backed by quality, creativity,
              and exceptional customer service.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
            >
              <Gift className="h-8 w-8 text-amber-600" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Premium Customization
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Personalize every product with names, logos, artwork,
                photos and branding using premium printing technology.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm"
            >
              <ShieldCheck className="h-8 w-8 text-amber-600" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Premium Quality
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Every product undergoes strict quality checks using durable
                materials and vibrant, long-lasting printing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-amber-100 bg-white p-6 shadow-sm md:col-span-2 lg:col-span-1"
            >
              <Truck className="h-8 w-8 text-amber-600" />
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                Worldwide Delivery
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Fast, reliable and secure worldwide shipping ensures your
                customized gifts arrive safely and on time.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-16">
          <CtaBanner
            title="Ready to Create Something Unique?"
            description="Whether you're ordering for yourself, your business, school, or corporate event, ZDreams is here to turn your ideas into premium personalized products."
          />
        </div>

      </div>
    </main>
  );
}