import { axiosInstance } from "../../../../lib/axiosInstance";
import { INQUIRIES_PAGE_SIZE } from "../constants";
import type { Inquiries, InquiryListResponse, InquiryPagination } from "../types";

type InquiryApiResponse = {
  data: Inquiries[];
  pagination: InquiryPagination;
};

export function normalizeInquiryFilter(value: string | undefined): string {
  const normalizedValue = value?.trim() ?? "";
  return normalizedValue === "all" ? "" : normalizedValue;
}

export async function fetchInquiries(
  search: string | undefined,
  page: number,
  category: string,
  userType: string,
): Promise<InquiryListResponse> {
  const response = await axiosInstance.get<InquiryApiResponse>("/inquiries", {
    params: {
      page,
      limit: INQUIRIES_PAGE_SIZE,
      search: normalizeInquiryFilter(search),
      category: normalizeInquiryFilter(category),
      userType: normalizeInquiryFilter(userType),
    },
  });

  return {
    inquiries: response.data.data,
    pagination: response.data.pagination,
  };
}