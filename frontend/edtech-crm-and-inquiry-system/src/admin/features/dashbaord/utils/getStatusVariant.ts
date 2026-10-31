import type { InquiryStatus } from "../types";

export function getStatusVariant(
  status: InquiryStatus,
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "RESOLVED":
      return "default";
    case "IN_PROGRESS":
      return "secondary";
    case "CLOSED":
      return "outline";
    case "PENDING":
    default:
      return "destructive";
  }
}