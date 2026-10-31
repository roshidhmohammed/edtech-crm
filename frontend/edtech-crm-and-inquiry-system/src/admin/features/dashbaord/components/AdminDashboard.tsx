import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import Stats from "./Stats";
import InquiryTable from "./InquiryTable";
import useFetchInquiries from "../hooks/useFetchInquiries";
import { INQUIRIES_PAGE_SIZE } from "../constants";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    refetch,
  } = useFetchInquiries(search, currentPage, categoryFilter, userTypeFilter);
  const inquiries = data?.inquiries ?? [];
  const totalRecords = data?.pagination.totalRecords ?? 0;
  const totalPages = Math.max(1, data?.pagination.totalPages ?? 1);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setUserTypeFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Monitor and manage EduConnect inquiries.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Summary cards */}
      <Stats />

      {/* Inquiry table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Inquiries</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Review and search submitted inquiries.
              </p>
            </div>

            <Badge variant="secondary">
              {totalRecords} results
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search and filters */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search name or phone..."
                className="pl-9"
                aria-label="Search inquiries by name or phone"
              />
            </div>

            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="scholarship">Scholarship</SelectItem>
                <SelectItem value="concert">Concert</SelectItem>
                <SelectItem value="admission">Admission</SelectItem>
                <SelectItem value="general_query">General Query</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={userTypeFilter}
              onValueChange={(value) => {
                setUserTypeFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="All user types" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All User Types</SelectItem>
                <SelectItem value="parent">Parent</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="school">School</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(search || categoryFilter !== "all" || userTypeFilter !== "all") && (
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}

          {/* Loading */}
          {(isPending || isPlaceholderData) && (
            <div className="flex min-h-48 items-center justify-center text-sm text-muted-foreground">
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Loading inquiries...
            </div>
          )}

          {/* Error */}
          {!isPending && !isPlaceholderData && error && (
            <div className="flex flex-col items-center gap-3 rounded-lg border border-destructive/30 p-8 text-center">
              <p className="text-sm text-destructive">
                {error instanceof Error
                  ? error.message
                  : "Something went wrong while loading inquiries."}
              </p>

              <Button variant="outline" onClick={() => void refetch()}>
                Try again
              </Button>
            </div>
          )}

          {/* Table */}
          {!isPending && !isPlaceholderData && !error && (
            <>
              <InquiryTable
                inquiries={inquiries}
                currentPage={currentPage}
                pageSize={data?.pagination.limit ?? INQUIRIES_PAGE_SIZE}
                totalRecords={totalRecords}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
