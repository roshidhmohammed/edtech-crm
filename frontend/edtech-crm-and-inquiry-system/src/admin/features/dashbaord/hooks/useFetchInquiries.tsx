import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchInquiries,
  normalizeInquiryFilter,
} from "../services/fetchInquiries";
import { useEffect } from "react";

const useFetchInquiries = (
  search: string | undefined,
  page: number,
  category: string,
  userType: string,
) => {
  const queryClient = useQueryClient();
  const normalizedSearch = normalizeInquiryFilter(search);
  const normalizedCategory = normalizeInquiryFilter(category);
  const normalizedUserType = normalizeInquiryFilter(userType);

  const query = useQuery({
    queryKey: [
      "inquiries-list",
      normalizedSearch,
      page,
      normalizedCategory,
      normalizedUserType,
    ],
    queryFn: () =>
      fetchInquiries(
        normalizedSearch,
        page,
        normalizedCategory,
        normalizedUserType,
      ),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!query.isPlaceholderData && query.data?.pagination.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: [
          "inquiries-list",
          normalizedSearch,
          page + 1,
          normalizedCategory,
          normalizedUserType,
        ],
        queryFn: () =>
          fetchInquiries(
            normalizedSearch,
            page + 1,
            normalizedCategory,
            normalizedUserType,
          ),
      });
    }
  }, [
    query.data,
    query.isPlaceholderData,
    page,
    queryClient,
    normalizedSearch,
    normalizedCategory,
    normalizedUserType,
  ]);

  return query;
};

export default useFetchInquiries;