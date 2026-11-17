import type { Metadata } from "next";

const SHORT_NAME = "Pathan Tutorials";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Pathan Tutorials of Mathematics, Maths Made Easy, Hinganghat",
};

interface PageMetadataInput {
  title: string;       // without the site name, the layout template adds it
  description: string;
  path: string;        // e.g. "/about"
}

// Page metadata with matching Open Graph tags. A page that defines `openGraph` replaces
// the layout's one entirely, so the title, description and URL must be repeated here
// or shared links would show the home page text on every page.
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SHORT_NAME,
      title: `${title} | ${SHORT_NAME}`,
      description,
      url: path,
      images: [OG_IMAGE],
    },
  };
}
