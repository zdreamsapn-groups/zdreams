import Link from "next/link";
import type { ReactNode } from "react";
import { company } from "@/data/company";

type SocialKey = keyof typeof company.social;

const icons: Partial<Record<SocialKey, ReactNode>> = {
  facebook: (
    <path d="M13.5 21v-7.5h2.52l.38-2.92H13.5V8.56c0-.85.24-1.43 1.46-1.43h1.54V4.52A20.7 20.7 0 0 0 14.28 4.4c-2.3 0-3.88 1.4-3.88 3.98v2.2H7.88v2.92h2.52V21h3.1Z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" fill="none" />
      <circle cx="16.8" cy="7.2" r="1.2" fill="currentColor" />
    </>
  ),
  linkedin: (
    <path d="M6.94 9H4.06v11h2.88V9ZM5.5 7.9A1.68 1.68 0 1 0 5.5 4.55 1.68 1.68 0 0 0 5.5 7.9ZM20.5 13.15c0-2.9-1.55-4.25-3.62-4.25-1.67 0-2.42.92-2.84 1.56V9H11.1v11h2.88v-5.87c0-1.55.29-3.04 2.21-3.04 1.89 0 1.91 1.76 1.91 3.14V20h2.4v-6.85Z" />
  ),
  pinterest: (
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.44 8.87 7.97 9.8-.11-.83-.21-2.11.04-3.02.24-.85 1.53-6.21 1.53-6.21s-.39-.78-.39-1.93c0-1.81 1.05-3.16 2.36-3.16 1.11 0 1.65.84 1.65 1.84 0 1.12-.71 2.8-1.08 4.35-.31 1.3.65 2.36 1.94 2.36 2.32 0 4.11-2.45 4.11-5.99 0-3.13-2.25-5.32-5.46-5.32-3.72 0-5.9 2.79-5.9 5.67 0 1.12.43 2.33.97 2.98.11.13.12.24.09.38-.1.4-.32 1.3-.36 1.48-.06.25-.19.3-.44.18-1.65-.77-2.68-3.18-2.68-5.12 0-4.17 3.03-7.99 8.73-7.99 4.58 0 8.14 3.26 8.14 7.63 0 4.55-2.87 8.21-6.85 8.21-1.34 0-2.6-.69-3.03-1.51l-.82 3.14c-.3 1.15-1.11 2.58-1.65 3.45A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z" />
  ),
};

const labels: Record<SocialKey, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  pinterest: "Pinterest",
  etsy: "Etsy",
};

export default function SocialIcons() {
  const links = (Object.keys(company.social) as SocialKey[])
    .filter((key) => company.social[key] && icons[key])
    .map((key) => ({
      key,
      href: company.social[key],
      icon: icons[key],
      label: labels[key],
    }));

  if (links.length === 0) return null;

  return (
    <div className="flex gap-3">
      {links.map(({ key, href, icon, label }) => (
        <Link
          key={key}
          href={href}
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-100 bg-white text-amber-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-500 hover:bg-amber-500 hover:text-white hover:shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]">
            {icon}
          </svg>
        </Link>
      ))}
    </div>
  );
}