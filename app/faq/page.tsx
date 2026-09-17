"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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

const faqs = [
  {
    question: "How do I place a custom order?",
    answer:
      "Browse our products, choose the item you want, complete the Custom Order Request form, upload your design or photo, and submit your request. We'll contact you with a final quotation.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. ZDreams accepts custom orders from customers around the world.",
  },
  {
    question: "What file formats can I upload?",
    answer:
      "You can upload JPG, JPEG, PNG, SVG and PDF files for customization.",
  },
  {
    question: "How long does production take?",
    answer:
      "Production time depends on the product and quantity. Most orders are completed within 3–7 business days after design approval.",
  },
  {
    question: "Can I order in bulk?",
    answer:
      "Yes. We offer great pricing for bulk mug orders, event website packages, and digital invitation bundles.",
  },
  {
    question: "Do you provide design assistance?",
    answer:
      "Yes. If you don't have a ready design, our team can help prepare your artwork before production.",
  },
  {
    question: "Can I customize every product?",
    answer:
      "Yes. Most of our products can be customized with photos, names, logos, artwork, or special messages.",
  },
  {
    question: "Which currency do you use?",
    answer:
      "All estimated prices on our website are displayed in USD ($). Final pricing may vary depending on customization and shipping.",
  },
  {
    question: "How will I receive my quotation?",
    answer:
      "After submitting the order form, we'll review your request and send a detailed quotation to your email.",
  },
  {
    question: "Do I pay on the website?",
    answer:
      "No. Our website is used for product showcase and quotation requests only. After confirming your order, we'll guide you through the purchasing process.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-amber-50 to-yellow-100 py-16">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"></div>
      <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-5xl px-6">

        <PageHeader
          badge="Frequently Asked Questions"
          title="How Can We Help?"
          subtitle="Answers to the most common questions about ordering personalized products from ZDreams."
        />

        <motion.div
          className="mt-10 space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              transition={{ delay: index * 0.04 }}
              className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className={`flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors duration-300 ${
                  openIndex === index ? "bg-amber-50/60" : "bg-white"
                }`}
              >
                <span className="text-sm font-semibold text-gray-900">
                  {faq.question}
                </span>

                <motion.div
                  animate={{
                    rotate: openIndex === index ? 180 : 0,
                  }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-amber-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-amber-100 px-6 py-4 text-sm leading-7 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <div className="mt-14">
          <CtaBanner
            title="Still Have Questions?"
            description="Our team is always ready to help you choose the perfect customized product and answer any questions about pricing, shipping, design, or bulk orders."
            secondaryLabel="Contact Our Team"
            secondaryHref="/contact"
          />
        </div>

      </div>
    </main>
  );
}