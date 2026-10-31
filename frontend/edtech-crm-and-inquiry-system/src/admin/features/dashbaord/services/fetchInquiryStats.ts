import { axiosInstance } from "../../../../lib/axiosInstance";
import type { InquiryStats } from "../types";

type InquiryStatsApiResponse = {
  data: InquiryStats;
};

export async function fetchInquiryStats(): Promise<InquiryStats> {
  const response =
    await axiosInstance.get<InquiryStatsApiResponse>("/inquiries/stats");

  return response.data.data;
}
