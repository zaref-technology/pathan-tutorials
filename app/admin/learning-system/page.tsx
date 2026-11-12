"use client";
import ContentPageEditor from "@/components/admin/ContentPageEditor";
import { DOC_IDS } from "@/lib/types";

export default function LearningSystemAdminPage() {
  return (
    <ContentPageEditor
      docId={DOC_IDS.LEARNING_SYSTEM}
      title="Learning System"
      helpText="Edit the Student Learning System page. Describe each part of your academic system. Only add details you can stand behind."
    />
  );
}
