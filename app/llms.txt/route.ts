import { getCourses } from "@/lib/firebase/firestore";
import { getPublicSiteSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/site-defaults";

export const dynamic = "force-dynamic";

// Plain-text summary for AI assistants and search crawlers (the llms.txt convention).
// Built only from admin-managed settings and published courses.
export async function GET() {
  const [settings, courses] = await Promise.all([getPublicSiteSettings(), getCourses().catch(() => [])]);

  const lines = [
    `# ${settings.siteName}`,
    "",
    `> ${settings.tagline}. Mathematics coaching in Hinganghat, Maharashtra for Classes 8th to 12th (CBSE and Maharashtra State Board) and MH-CET.`,
    "",
    "## Contact",
    `- Address: ${settings.address}`,
    `- Phone and WhatsApp: ${settings.phone}`,
    ...(settings.instagramUrl ? [`- Instagram: ${settings.instagramUrl}`] : []),
    `- Website: ${SITE_URL}`,
    "",
    "## Pages",
    `- [Courses](${SITE_URL}/courses)`,
    `- [Teaching Methodology](${SITE_URL}/methodology)`,
    `- [Student Learning System](${SITE_URL}/learning-system)`,
    `- [Results](${SITE_URL}/results)`,
    `- [Director and Faculty](${SITE_URL}/faculty)`,
    `- [About Us](${SITE_URL}/about)`,
    `- [Announcements](${SITE_URL}/announcements)`,
    `- [Contact and Admission Enquiry](${SITE_URL}/contact)`,
  ];

  if (courses.length > 0) {
    lines.push("", "## Courses");
    for (const c of courses) {
      const detail = [c.class && `Class ${c.class}`, c.board].filter(Boolean).join(", ");
      lines.push(`- [${c.name}](${SITE_URL}/courses/${c.slug ?? c.id})${detail ? `: ${detail}` : ""}`);
    }
  }

  return new Response(lines.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
