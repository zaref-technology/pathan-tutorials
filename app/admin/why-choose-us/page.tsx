"use client";
import ContentPageEditor from "@/components/admin/ContentPageEditor";
import { DOC_IDS } from "@/lib/types";

export default function WhyChooseUsAdminPage() {
  return (
    <ContentPageEditor
      docId={DOC_IDS.WHY_CHOOSE_US}
      title="Why Choose Us"
      helpText="Edit the Why Choose Us points shown on the home page. Avoid numbers you cannot verify."
    />
  );
}
