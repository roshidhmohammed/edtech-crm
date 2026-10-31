import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type {
  Inquiries,
  InquiryCategory,
  InquiryStatus,
  UserType,
} from "../types";
import {
  CATEGORY_LABELS,
  STATUS_LABELS,
  USER_TYPE_LABELS,
} from "../constants";
import { formatDate } from "../utils/formatDate";
import { getStatusVariant } from "../utils/getStatusVariant";
import { Badge } from "@/components/ui/badge";

type InquiryDialogProps = {
  inquiry: Inquiries | null;
  onOpenChange: (open: boolean) => void;
};

const InquiryDialog = ({ inquiry, onOpenChange }: InquiryDialogProps) => {
  const isUserType = (value: string): value is UserType =>
    value in USER_TYPE_LABELS;
  const isCategory = (value: string): value is InquiryCategory =>
    value in CATEGORY_LABELS;
  const isInquiryStatus = (value: string): value is InquiryStatus =>
    value in STATUS_LABELS;

  return (
    <Dialog open={inquiry !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Inquiry Details</DialogTitle>
          <DialogDescription>
            View the complete information submitted by the user.
          </DialogDescription>
        </DialogHeader>

        {inquiry && (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="break-words font-medium">{inquiry.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="break-words font-medium">{inquiry.phoneNumber}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="break-all font-medium">{inquiry.email}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">User Type</p>
                <p className="font-medium">
                  {isUserType(inquiry.userType)
                    ? USER_TYPE_LABELS[inquiry.userType]
                    : inquiry.userType}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">
                  {isCategory(inquiry.category)
                    ? CATEGORY_LABELS[inquiry.category]
                    : inquiry.category}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="font-medium">{formatDate(inquiry.createdAt)}</p>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <p className="text-sm text-muted-foreground">Status</p>
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
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Message / Query</p>
              <div className="whitespace-pre-wrap break-words rounded-md border bg-muted/30 p-4 text-sm leading-6">
                {inquiry.message ?? "Message unavailable."}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDialog;
