import type { InquiryCategory, InquiryStatus, UserType } from "../types";

export const INQUIRIES_PAGE_SIZE = 10;

export const CATEGORY_LABELS: Record<InquiryCategory, string> = {
  scholarship: "Scholarship",
  concert: "Concert",
  admission: "Admission",
  general_query: "General Query",
};

export const USER_TYPE_LABELS: Record<UserType, string> = {
  parent: "parent",
  student: "student",
  school: "school",
};

export const STATUS_STYLES: Record<InquiryStatus, string> = {
  PENDING:
    "border-amber-200 bg-amber-50 text-amber-700",
  IN_PROGRESS:
    "border-blue-200 bg-blue-50 text-blue-700",
  RESOLVED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  CLOSED:
    "border-slate-200 bg-slate-100 text-slate-600",
};

export const STATUS_LABELS: Record<InquiryStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};
