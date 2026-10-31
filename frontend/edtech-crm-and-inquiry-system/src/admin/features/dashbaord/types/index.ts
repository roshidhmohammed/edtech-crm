export type UserType = "parent" | "student" | "school";

export type InquiryCategory =
  | "scholarship"
  | "concert"
  | "admission"
  | "general_query";

export type InquiryStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  userType: UserType;
  category: InquiryCategory;
  message: string;
  status: InquiryStatus;
  createdAt: Date ;
  updatedAt?: Date;
}

export type Inquiries = {
  id: string;
  category: string;
  name: string;
  createdAt: Date | string;
  phoneNumber: string;
  status: string;
  userType: string;
  email: string;
  message?: string;
};

export type InquiriesState = {
  inquiries: Inquiries[];
};

export type InquiryPagination = {
  currentPage: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type InquiryListResponse = {
  inquiries: Inquiries[];
  pagination: InquiryPagination;
};

export type InquiryStats = {
  totalInquiries: number;
  pendingInquiries: number;
  inProgressInquiries: number;
  resolvedInquiries: number;
};