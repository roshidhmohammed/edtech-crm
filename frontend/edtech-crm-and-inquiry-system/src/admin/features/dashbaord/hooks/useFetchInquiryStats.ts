import { useQuery } from "@tanstack/react-query";
import { fetchInquiryStats } from "../services/fetchInquiryStats";

const useFetchInquiryStats = () =>
  useQuery({
    queryKey: ["inquiry-stats"],
    queryFn: fetchInquiryStats,
  });

export default useFetchInquiryStats;
