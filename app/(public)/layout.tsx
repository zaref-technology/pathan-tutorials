import type { Metadata } from "next";
import { getNavigationSettings, getSEOSettings } from "@/lib/firebase/firestore";
import { getPublicSiteSettings } from "@/lib/content";
import { DEFAULT_KEYWORDS, SITE_URL } from "@/lib/site-defaults";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FloatingButtons from "@/components/public/FloatingButtons";
import Analytics from "@/components/public/Analytics";

// Public pages must always show the latest admin edits, so the whole (public)
// tree is rendered on every request instead of being frozen at build time.
export const dynamic = "force-dynamic";

const DEFAULT_DESCRIPTION =
  "Mathematics coaching in Hinganghat for Classes 8th to 12th (CBSE and Maharashtra State Board) and MH-CET. Maths Made Easy.";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, seo] = await Promise.all([
    getPublicSiteSettings(),
    getSEOSettings().catch(() => null),
  ]);

  const siteName = settings.siteName;
  const title = seo?.metaTitle?.trim() || `${siteName} | Maths Classes in Hinganghat`;
  const description = seo?.metaDescription?.trim() || settings.description?.trim() || DEFAULT_DESCRIPTION;
  const robots = seo?.robots ?? "index, follow";
  const ogImage = seo?.ogImage?.trim();
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(seo?.canonicalUrl?.trim() || SITE_URL),
    title: { default: title, template: `%s | ${siteName}` },
    description,
    keywords: seo?.keywords?.trim() || DEFAULT_KEYWORDS,
    robots: { index: !robots.includes("noindex"), follow: !robots.includes("nofollow") },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName,
      title: seo?.ogTitle?.trim() || title,
      description: seo?.ogDescription?.trim() || description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: { card: ogImage ? "summary_large_image" : "summary" },
    ...(googleVerification ? { verification: { google: googleVerification } } : {}),
  };
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, navRes] = await Promise.all([
    getPublicSiteSettings(),
    getNavigationSettings().catch(() => null),
  ]);

  // Structured data mirrors what is visible in the footer and contact page.
  const sameAs = [settings.instagramUrl, settings.facebookUrl, settings.youtubeUrl].filter(Boolean);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: settings.siteName,
    url: SITE_URL,
    description: settings.description || DEFAULT_DESCRIPTION,
    telephone: settings.phone,
    ...(settings.logo ? { logo: settings.logo } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
      addressLocality: "Hinganghat",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <>
      {/* "<" is escaped so admin-entered text can never close the script tag. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Navbar nav={navRes} settings={settings} />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
      <FloatingButtons settings={settings} />
      <Analytics />
    </>
  );
}
