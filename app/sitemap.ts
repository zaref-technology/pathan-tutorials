import type { MetadataRoute } from "next";
import { getCourses } from "@/lib/firebase/firestore";
import { SITE_URL } from "@/lib/site-defaults";

// Rendered per request so new courses appear without a redeploy.
export const dynamic = "force-dynamic";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/courses", priority: 0.9 },
  { path: "/methodology", priority: 0.7 },
  { path: "/learning-system", priority: 0.6 },
  { path: "/results", priority: 0.8 },
  { path: "/achievements", priority: 0.6 },
  { path: "/faculty", priority: 0.7 },
  { path: "/testimonials", priority: 0.6 },
  { path: "/gallery", priority: 0.5 },
  { path: "/announcements", priority: 0.5 },
  { path: "/contact", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const courses = await getCourses().catch(() => []);
  const now = new Date();

  return [
    ...STATIC_ROUTES.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority })),
    ...courses.map((c) => ({
      url: `${SITE_URL}/courses/${encodeURIComponent(c.slug ?? c.id)}`,
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      priority: 0.7,
    })),
  ];
}
