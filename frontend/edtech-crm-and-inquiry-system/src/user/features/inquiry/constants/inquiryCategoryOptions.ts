export const INQUIRY_CATEGORY_OPTIONS = [
  { label: "Scholarship", value: "scholarship" },
  { label: "Concert", value: "concert" },
  { label: "Admission", value: "admission" },
  { label: "General Query", value: "general_query" },
] as const;

export type InquiryCategory =
  (typeof INQUIRY_CATEGORY_OPTIONS)[number]["value"];