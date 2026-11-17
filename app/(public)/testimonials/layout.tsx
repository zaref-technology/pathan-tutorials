import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Student and Parent Testimonials",
  description: "What students and parents say about learning Mathematics at Pathan Tutorials, Hinganghat.",
  path: "/testimonials",
});

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
