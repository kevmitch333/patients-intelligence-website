import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/how-it-works", "/platform", "/pgi-standard", "/pilot", "/trust", "/partners", "/about", "/insights", "/contact", "/demo", "/privacy", "/terms", "/accessibility", "/research-policy", "/data-governance", "/brand-and-attribution"];
  return routes.map((route) => ({ url: `https://patientsintelligence.com${route}`, lastModified: new Date("2026-09-04"), changeFrequency: route === "/insights" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/demo" || route === "/pilot" ? 0.9 : 0.7 }));
}
