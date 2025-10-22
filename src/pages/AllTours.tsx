/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  useGetAllToursQuery,
  useGetTourTypesQuery,
} from "@/redux/features/tour/tour.api";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import TourCard from "@/components/TourCard";

export default function AllTours() {
  // ---------- State ----------
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivision, setFilterDivision] = useState("");
  const [filterTourType, setFilterTourType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  // ---------- Queries ----------
  const { data: divisions } = useGetDivisionsQuery({});
  const { data: tourTypes } = useGetTourTypesQuery({});
  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
    searchTerm,
  };
  if (filterDivision) query.division = filterDivision;
  if (filterTourType) query.tourType = filterTourType;

  const { data, isFetching } = useGetAllToursQuery(query);
  const tours = data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;

  // ---------- Handlers ----------
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setFilterDivision("");
    setFilterTourType("");
    setCurrentPage(1);
  };

  console.log(tours);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold mb-8 text-center">All Tours</h1>

      {/* 🔹 Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap justify-center items-center gap-4 mb-10"
      >
        <Input
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-60"
        />

        {/* Division Filter */}
        <select
          value={filterDivision}
          onChange={(e) => {
            setFilterDivision(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-md p-2 w-48"
        >
          <option value="">All Divisions</option>
          {divisions?.data?.map((division: any) => (
            <option key={division._id} value={division._id}>
              {division.name}
            </option>
          ))}
        </select>

        {/* Tour Type Filter */}
        <select
          value={filterTourType}
          onChange={(e) => {
            setFilterTourType(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 rounded-md p-2 w-48"
        >
          <option value="">All Tour Types</option>
          {tourTypes?.data?.map((type: any) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Always reserve space for Reset button (prevents layout shift) */}
        <div className="w-28 flex justify-center">
          {searchTerm || filterDivision || filterTourType ? (
            <Button className="p-5" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          ) : (
            <div className="h-10 w-24"></div>
          )}
        </div>
      </form>

      {/* 🔹 Tours Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[30vh]">
        {isFetching ? (
          // Loader while fetching
          <div className="col-span-full flex justify-center items-center h-[30vh]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : tours.length > 0 ? (
          // Show tours
          tours.map((tour: any) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          // Show message if no tours
          <Card className="p-10 text-center text-gray-500 shadow-sm col-span-full">
            No tours found.
          </Card>
        )}
      </div>

      {/* 🔹 Pagination */}
      {totalPage > 1 && (
        <div className="flex justify-end mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPage }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                      className={`cursor-pointer ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev === totalPage ? prev : prev + 1
                    )
                  }
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
