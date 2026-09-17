"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Heart,
  ArrowUp,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/product" },
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Request Quote", href: "/request-quote" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  {
    name: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    name: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: FaLinkedinIn,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-amber-100 bg-gradient-to-br from-white via-amber-50 to-yellow-100">
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl"></div>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                Z<span className="text-amber-600">Dreams</span>
              </h2>
            </Link>

            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
              Powered by APN Groups
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-600">
              We create personalized mugs, custom event websites, and
              memorable gifts with exceptional quality and creativity.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="rounded-xl border border-amber-100 bg-white p-2.5 text-amber-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:bg-amber-500 hover:text-white hover:shadow-lg"
                  >
                    <Icon size={15} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-gray-600 transition-all duration-300 hover:translate-x-1 hover:text-amber-600"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-amber-400 transition group-hover:text-amber-600" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <Mail className="h-4 w-4 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href="mailto:zdreams.apn@gmail.com"
                    className="text-sm font-medium text-gray-800 transition hover:text-amber-600"
                  >
                    zdreams.apn@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <Phone className="h-4 w-4 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">WhatsApp</p>
                  <a
                    href="https://wa.me/7200535609"
                    className="text-sm font-medium text-gray-800 transition hover:text-amber-600"
                  >
                    +91 7200535609
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-100 p-2">
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Service Area</p>
                  <p className="text-sm font-medium text-gray-800">
                    Worldwide Shipping
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
              Newsletter
            </h3>

            <p className="mt-5 text-sm leading-6 text-gray-600">
              Subscribe to receive updates on new products, offers and
              exclusive deals.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-amber-100"
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-yellow-500 px-4 text-white transition hover:from-amber-700 hover:to-yellow-600"
              >
                <Send size={16} />
              </button>
            </form>

            <div className="mt-5 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
              <h4 className="text-sm font-bold text-amber-700">
                Premium Custom Gifts
              </h4>
              <p className="mt-1.5 text-xs leading-5 text-gray-600">
                Personalized mugs plus beautiful event websites for
                weddings, birthdays, baby showers and much more.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-amber-100 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-gray-900">ZDreams</span>
                . All Rights Reserved.
              </p>

              <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-gray-500 lg:justify-start">
                Made with
                <Heart className="h-3.5 w-3.5 fill-red-500 text-red-500" />
                by
                <span className="font-semibold text-amber-600">
                  APN Groups
                </span>
              </p>
            </div>

            {/* Payments */}
            <div className="text-center lg:text-right">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Secure Payments
              </p>

              <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
                {["Visa", "MasterCard", "UPI", "Payoneer"].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg border border-amber-100 bg-white px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm transition-all duration-200 hover:border-amber-500 hover:text-amber-600"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Back to Top
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}