import { ContentItem, ContentPage, ContentPageId, DOC_IDS } from "@/lib/types";

const item = (id: string, icon: string, title: string, description: string): ContentItem => ({
  id, icon, title, description,
});

// Starting content for each editable page. It contains no statistics or achievements.
// Used until the admin saves their own version.
export const CONTENT_PAGE_DEFAULTS: Record<ContentPageId, ContentPage> = {
  [DOC_IDS.METHODOLOGY]: {
    heading: "Our Teaching Methodology",
    subheading: "A clear, structured approach that helps every student understand Mathematics.",
    tagline: "WE DON'T JUST TEACH MATHEMATICS. WE BUILD MATHEMATICAL UNDERSTANDING.",
    items: [
      item("m1", "idea", "Concept Clarity", "We focus on understanding concepts instead of memorising steps."),
      item("m2", "layers", "Step-by-Step Learning", "Every chapter is taught in small, connected steps so no student is left behind."),
      item("m3", "file", "Regular Practice & Worksheets", "Students practise each topic with worksheets and chapter-wise problems."),
      item("m4", "clipboard", "Weekly Test System", "Regular tests help students check their understanding and build exam confidence."),
      item("m5", "chart", "Performance Analysis", "Test results are reviewed to find strong and weak areas for each student."),
      item("m6", "help", "Doubt Solving Sessions", "Dedicated sessions to clear doubts before they grow into bigger problems."),
      item("m7", "user", "Personal Attention", "Individual attention to every student's progress and difficulties."),
      item("m8", "graduation", "Board Examination Preparation", "Focused preparation for board examinations with exam-pattern practice."),
    ],
  },
  [DOC_IDS.LEARNING_SYSTEM]: {
    heading: "Student Learning System",
    subheading: "The academic system that keeps every student practising, tested and improving.",
    tagline: "",
    items: [
      item("l1", "clipboard", "Weekly Tests", ""),
      item("l2", "chart", "Monthly Performance Reports", ""),
      item("l3", "file", "Chapter-wise Practice Papers", ""),
      item("l4", "help", "Doubt Solving Sessions", ""),
      item("l5", "refresh", "Revision Tests", ""),
      item("l6", "graduation", "Board Examination Preparation", ""),
      item("l7", "book", "Foundation Mathematics", ""),
    ],
  },
  [DOC_IDS.WHY_CHOOSE_US]: {
    heading: "Why Choose Pathan Tutorials?",
    subheading: "Mathematics coaching built around understanding, practice and personal attention.",
    tagline: "",
    items: [
      item("w1", "idea", "Concept-Based Teaching", ""),
      item("w2", "check", "CBSE & State Board", ""),
      item("w3", "target", "MH-CET Preparation", ""),
      item("w4", "user", "Individual Attention", ""),
      item("w5", "clipboard", "Weekly Tests & Analysis", ""),
      item("w6", "help", "Doubt Solving Sessions", ""),
    ],
  },
  [DOC_IDS.ABOUT_PAGE]: {
    heading: "Our Journey",
    subheading: "",
    tagline: "",
    // Items with an empty description are hidden on the public page until the admin fills them in.
    items: [
      item("a1", "clock", "Our Journey", ""),
      item("a2", "target", "Our Vision", "Building Strong Concepts. Developing Confident Learners."),
      item("a3", "award", "Our Mission", ""),
      item("a4", "idea", "Teaching Philosophy", "We don't just teach Mathematics. We build mathematical understanding."),
      item("a5", "heart", "Commitment to Students", ""),
      item("a6", "trending", "Future Vision", ""),
    ],
  },
};
