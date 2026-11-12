"use client";
import ContentPageEditor from "@/components/admin/ContentPageEditor";
import { DOC_IDS } from "@/lib/types";

export default function AboutAdminPage() {
  return (
    <ContentPageEditor
      docId={DOC_IDS.ABOUT_PAGE}
      title="About Page"
      helpText="Edit the sections of the About Us page: journey, vision, mission, philosophy, commitment and future vision. Sections with an empty description are hidden until you fill them in."
    />
  );
}
