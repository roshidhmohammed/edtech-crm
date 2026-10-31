import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import type {
  Inquiries,
  InquiryCategory,
  InquiryStatus,
  UserType,
} from "../types";
import { CATEGORY_LABELS, STATUS_LABELS, USER_TYPE_LABELS } from "../constants";
import { getStatusVariant } from "../utils/getStatusVariant";
import { formatDate } from "../utils/formatDate";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import InquiryDialog from "./InquiryDialog";

type InquiryTableProps = {
  inquiries: Inquiries[];
  currentPage: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const InquiryTable = ({
  inquiries,
  currentPage,
  pageSize,
  totalRecords,
  totalPages,
  onPageChange,
}: InquiryTableProps) => {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiries | null>(null);

  const isUserType = (value: string): value is UserType =>
    value in USER_TYPE_LABELS;

  const isCategory = (value: string): value is InquiryCategory =>
    value in CATEGORY_LABELS;

  const isInquiryStatus = (value: string): value is InquiryStatus =>
    value in STATUS_LABELS;

  return (
    <>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>User Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="min-w-32 font-medium">
                  {inquiry.name}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {inquiry.phoneNumber}
                </TableCell>

                <TableCell className="min-w-48">{inquiry.email}</TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {isUserType(inquiry.userType)
                      ? USER_TYPE_LABELS[inquiry.userType]
                      : inquiry.userType}
                  </Badge>
                </TableCell>

                <TableCell>
                  {isCategory(inquiry.category)
                    ? CATEGORY_LABELS[inquiry.category]
                    : inquiry.category}
                </TableCell>

                <TableCell className="whitespace-nowrap">
                  {formatDate(inquiry.createdAt)}
                </TableCell>

                <TableCell>
                  <Badge
                    variant={
                      isInquiryStatus(inquiry.status)
                        ? getStatusVariant(inquiry.status)
                        : "outline"
                    }
                  >
                    {isInquiryStatus(inquiry.status)
                      ? STATUS_LABELS[inquiry.status]
                      : inquiry.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedInquiry(inquiry)}
                    aria-label={`View inquiry from ${inquiry.name}`}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {inquiries.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No inquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <InquiryDialog
        inquiry={selectedInquiry}
        onOpenChange={(open) => {
          if (!open) setSelectedInquiry(null);
        }}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {totalRecords === 0
            ? "Showing 0 inquiries"
            : `Showing ${(currentPage - 1) * pageSize + 1}–${Math.min(
                currentPage * pageSize,
                totalRecords,
              )} of ${totalRecords} inquiries`}
        </p>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm">Page {currentPage} of {totalPages}</span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default InquiryTable;
