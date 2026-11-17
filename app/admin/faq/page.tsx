"use client";
import ContentPageEditor from "@/components/admin/ContentPageEditor";
import { DOC_IDS } from "@/lib/types";

export default function FaqAdminPage() {
  return (
    <ContentPageEditor
      docId={DOC_IDS.FAQ}
      title="FAQ"
      helpText="Questions parents often ask. They appear on the home page and help Google and AI assistants answer questions about your classes. Only write answers that are true."
      titleLabel="Question"
      descriptionLabel="Answer"
    />
  );
}
