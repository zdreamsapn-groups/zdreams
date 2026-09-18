"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Globe, Menu, X } from "lucide-react";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";

const MobileNav = dynamic(() => import("./MobileNav"), { ssr: false });

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-amber-200/50 bg-white/90 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">

          <Logo />

          <DesktopNav />

          <div className="flex items-center gap-4">

            <div className="hidden xl:flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2">
              <Globe className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">
                Worldwide Shipping
              </span>
            </div>

            <Link
              href="/request-quote"
              className="hidden md:inline-flex rounded-xl bg-amber-600 px-6 py-3 font-semibold text-white transition hover:bg-amber-700"
            >
              Request Quote
            </Link>

            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="rounded-xl border p-2 lg:hidden"
            >
              {open ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

          </div>

        </div>
      </header>

      <MobileNav open={open} setOpen={setOpen} />
    </>
  );
}