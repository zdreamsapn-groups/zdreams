import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/request-quote", "/search"],
      },
    ],
    host: "https://zdreams.com",
  };
}