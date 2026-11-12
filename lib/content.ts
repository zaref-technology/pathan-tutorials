import "server-only";
import { getContentPage, getSiteSettings } from "@/lib/firebase/firestore";
import { CONTENT_PAGE_DEFAULTS } from "@/lib/content-defaults";
import { withSiteDefaults } from "@/lib/site-defaults";
import type { ContentPage, ContentPageId, SiteSettings } from "@/lib/types";

// Saved page content if the admin has edited it, otherwise the starting content.
export async function getContentPageOrDefault(id: ContentPageId): Promise<ContentPage> {
  const saved = await getContentPage(id).catch(() => null);
  const defaults = CONTENT_PAGE_DEFAULTS[id];
  if (!saved || !Array.isArray(saved.items)) return defaults;
  return { ...defaults, ...saved };
}

// Site settings with the institute's contact details filled in where the admin left blanks.
export async function getPublicSiteSettings(): Promise<SiteSettings> {
  const saved = await getSiteSettings().catch(() => null);
  return withSiteDefaults(saved);
}
