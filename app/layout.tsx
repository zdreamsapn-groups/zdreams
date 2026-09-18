import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zdreams.com"),
  title: {
    default: "ZDreams | Premium Customized Gifts",
    template: "%s | ZDreams",
  },
  description:
    "Premium customized mugs and beautiful event websites for weddings, birthdays, baby showers and all special occasions.",
  keywords: [
    "customized mugs",
    "personalized gifts",
    "event website design",
    "wedding websites",
    "custom invitations",
    "ZDreams",
    "APN Groups",
  ],
  openGraph: {
    title: "ZDreams | Premium Customized Gifts",
    description:
      "Premium customized mugs and beautiful event websites for weddings, birthdays, baby showers and all special occasions.",
    url: "https://zdreams.com",
    siteName: "ZDreams",
    images: [
      {
        url: "/images/hero/hero-banner.jpg",
        width: 757,
        height: 488,
        alt: "ZDreams Customized Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZDreams | Premium Customized Gifts",
    description:
      "Premium customized mugs and beautiful event websites for every special occasion.",
    images: ["/images/hero/hero-banner.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />

        <main className="flex-1">{children}</main>

        <Footer />

        <Toaster
          position="bottom-right"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontSize: "0.875rem",
            },
          }}
        />
      </body>
    </html>
  );
}