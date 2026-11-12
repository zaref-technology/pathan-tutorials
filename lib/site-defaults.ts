import type { SiteSettings } from "@/lib/types";

// Public production URL. Override with NEXT_PUBLIC_SITE_URL for previews.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.pathantutorials.in").replace(/\/$/, "");

export const DEFAULT_SITE_NAME = "Pathan Tutorials of Mathematics";
export const DEFAULT_TAGLINE = "Maths Made Easy";

// Contact details supplied by the institute. Used only where the admin has left a field empty.
const CONTACT_DEFAULTS: Pick<SiteSettings, "phone" | "whatsapp" | "address" | "instagramUrl"> = {
  phone: "9403553309",
  whatsapp: "9403553309",
  address: "Opposite to Sanjay Gandhi School, Hinganghat",
  instagramUrl: "https://www.instagram.com/pathantutorials",
};

export const DEFAULT_KEYWORDS = [
  "Maths Classes in Hinganghat",
  "Mathematics Coaching in Hinganghat",
  "10th Maths Classes Hinganghat",
  "11th & 12th Mathematics Classes Hinganghat",
  "MH-CET Maths Coaching Hinganghat",
  "Pathan Tutorials",
].join(", ");

export function withSiteDefaults(settings: SiteSettings | null): SiteSettings {
  const s = settings ?? ({} as Partial<SiteSettings>);
  return {
    ...(s as SiteSettings),
    siteName: s.siteName?.trim() || DEFAULT_SITE_NAME,
    tagline: s.tagline?.trim() || DEFAULT_TAGLINE,
    phone: s.phone?.trim() || CONTACT_DEFAULTS.phone,
    whatsapp: s.whatsapp?.trim() || s.phone?.trim() || CONTACT_DEFAULTS.whatsapp,
    address: s.address?.trim() || CONTACT_DEFAULTS.address,
    instagramUrl: s.instagramUrl?.trim() || CONTACT_DEFAULTS.instagramUrl,
  };
}

// Only Google Maps embed URLs are allowed in the iframe.
export function isGoogleMapsEmbedUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && u.hostname.endsWith("google.com") && u.pathname.startsWith("/maps/embed");
  } catch {
    return false;
  }
}
