"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  Home,
  User,
  Package,
  ImageIcon,
  CircleHelp,
  Phone,
  X,
  Rocket,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";
import SocialIcons from "./SocialIcons";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "About",
    href: "/about",
    icon: User,
  },
  {
    name: "Products",
    href: "/product",
    icon: Package,
  },
  {
    name: "Gallery",
    href: "/gallery",
    icon: ImageIcon,
  },
  {
    name: "FAQ",
    href: "/faq",
    icon: CircleHelp,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Phone,
  },
];

export default function MobileNav({ open, setOpen }: Props) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed right-0 top-0 z-50 flex h-screen w-80 flex-col border-l border-amber-100 bg-white lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-amber-100 p-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
                  Z<span className="text-amber-600">Dreams</span>
                </h2>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Powered by APN Groups
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={clsx(
                        "group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                      )}
                    >
                      <Icon
                        className={clsx(
                          "h-5 w-5 transition-all duration-300",
                          isActive
                            ? "text-white"
                            : "text-amber-500 group-hover:scale-110"
                        )}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Request Quote Button */}
              <Link
                href="/request-quote"
                onClick={() => setOpen(false)}
                className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Rocket className="h-4 w-4" />
                Request Quote
              </Link>

              {/* Shipping Card */}
              <div className="mt-6 rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  <Globe className="h-4 w-4 text-amber-600" />
                  Worldwide Shipping
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-600">
                  We deliver premium customized products to customers across
                  the world with secure packaging and fast shipping.
                </p>
              </div>
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-amber-100 p-6">
              <div className="rounded-2xl bg-amber-50/60 p-4">
                <h3 className="text-sm font-bold text-gray-900">
                  Need Help?
                </h3>

                <p className="mt-1 text-xs leading-5 text-gray-600">
                  Contact our team for product inquiries, bulk orders and
                  customization support.
                </p>

                <a
                  href="mailto:zdreams.apn@gmail.com"
                  className="mt-3 flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800"
                >
                  <Mail className="h-3.5 w-3.5" />
                  zdreams.apn@gmail.com
                </a>

                <a
                  href="https://wa.me/7200535609"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-amber-700 hover:text-amber-800"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp Us
                </a>
              </div>

              {/* Social Icons */}
              <div className="mt-5 flex justify-center">
                <SocialIcons />
              </div>

              <p className="mt-5 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} ZDreams
                <br />
                Powered by APN Groups
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}