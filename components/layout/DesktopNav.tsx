"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/product" }, // change to /products if you rename the folder
  { name: "Gallery", href: "/gallery" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-2">
      {navItems.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300",
              isActive
                ? "bg-amber-600 text-white shadow-lg"
                : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
            )}
          >
            {item.name}
            
          </Link>
          
        );
      })}
    </nav>
  );
}