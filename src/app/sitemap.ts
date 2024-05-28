import { MetadataRoute } from "next";
import { getLastCommitDate } from "@/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASEURL;
  const lastCommitDate = getLastCommitDate();

  return [
    {
      url: `${baseUrl}`,
      lastModified: lastCommitDate,
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: lastCommitDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: lastCommitDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: lastCommitDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: lastCommitDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: lastCommitDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
