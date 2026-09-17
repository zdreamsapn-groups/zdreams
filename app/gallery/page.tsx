"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { gallery } from "@/data/gallery";
import Container from "@/components/ui/Container";
import PageHeader from "@/components/ui/PageHeader";

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

export default function GalleryPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"></div>
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

      <Container>
        <PageHeader
          badge="Gallery"
          title="Our Custom Creations"
          subtitle="A selection of personalized products crafted for customers around the world."
        />

        <motion.div
          className="mt-10 grid gap-4 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="group overflow-hidden rounded-3xl border border-amber-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="h-auto max-h-[200px] w-auto object-contain"
                  />
                </motion.div>
              </div>

              <div className="border-t p-5">
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Customized with photos, logos, names, artwork and premium
                  quality printing.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </main>
  );
}