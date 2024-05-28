import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  return {
    rules: [
      {
        userAgent: "*",
        allow: [`${baseUrl}`, `${baseUrl}/about-us`, "/contacts"],
        disallow: ["/admin:path", "/privacy"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
