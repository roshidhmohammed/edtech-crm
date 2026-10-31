export const USER_TYPE_OPTIONS = [
  { label: "Parent", value: "parent" },
  { label: "Student", value: "student" },
  { label: "School", value: "school" },
] as const;

export type UserType = (typeof USER_TYPE_OPTIONS)[number]["value"];