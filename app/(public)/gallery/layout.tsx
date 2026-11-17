import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery: Classroom and Activities",
  description: "Photos from classes, teaching sessions, weekly tests, events and celebrations at Pathan Tutorials, Hinganghat.",
  path: "/gallery",
});

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
