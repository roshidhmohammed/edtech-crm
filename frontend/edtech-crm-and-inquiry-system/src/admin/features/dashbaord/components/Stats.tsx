import {
  Users,
  Clock,
  CheckCircle2,
  ClipboardList,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useFetchInquiryStats from "../hooks/useFetchInquiryStats";

const Stats = () => {
  const { data: stats, error, isPending, refetch, isFetching } =
    useFetchInquiryStats();

  if (isPending) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {["Total Inquiries", "Pending", "In Progress", "Resolved"].map(
          (title) => (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" aria-label="Loading">
                  —
                </div>
              </CardContent>
            </Card>
          ),
        )}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div
        className="flex items-center justify-between gap-4 rounded-lg border border-destructive/30 p-4"
        role="alert"
      >
        <p className="text-sm text-destructive">
          {error instanceof Error
            ? error.message
            : "Unable to load inquiry statistics."}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          Retry
        </Button>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Inquiries",
      value: stats.totalInquiries,
      description: "All submitted inquiries",
      icon: ClipboardList,
    },
    {
      title: "Pending",
      value: stats.pendingInquiries,
      description: "Awaiting attention",
      icon: Clock,
    },
    {
      title: "In Progress",
      value: stats.inProgressInquiries,
      description: "Currently being handled",
      icon: Users,
    },
    {
      title: "Resolved",
      value: stats.resolvedInquiries,
      description: "Successfully resolved",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>

              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="mt-1 text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Stats;