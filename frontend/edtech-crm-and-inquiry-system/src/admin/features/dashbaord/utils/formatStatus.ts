import type { InquiryStatus } from "../types";

export function formatStatus(status: InquiryStatus) {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
