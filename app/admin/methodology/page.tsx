"use client";
import ContentPageEditor from "@/components/admin/ContentPageEditor";
import { DOC_IDS } from "@/lib/types";

export default function MethodologyAdminPage() {
  return (
    <ContentPageEditor
      docId={DOC_IDS.METHODOLOGY}
      title="Teaching Methodology"
      helpText="Edit the Teaching Methodology page and the home page section. Each item is one step of your teaching approach."
      showTagline
    />
  );
}
