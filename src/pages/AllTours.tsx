/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useSearchParams } from "react-router";
import TourCardSkeleton from "@/components/skeletons/TourCardSkeleton";
import { Search, X, Loader2 } from "lucide-react";

export default function AllTours() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract query params
  const searchTerm = searchParams.get("searchTerm") || "";
  const division = searchParams.get("division") || "";
  const tourType = searchParams.get("tourType") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = 6;

  // API Queries
  const { data: divisionsData } = useGetDivisionsQuery({});
  const { data: tourTypesData } = useGetTourTypesQuery({});
  const { data, isFetching } = useGetAllToursQuery({
    page: page.toString(),
    limit: limit.toString(),
    ...(searchTerm && { searchTerm }),
    ...(division && { division }),
    ...(tourType && { tourType }),
  });

  const tours = data?.data || [];
  const totalPages = data?.meta?.totalPage || 1;

  // Handlers
  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    // Always reset to page 1 when filters change (except explicit page change)
    if (!updates.page) params.set("page", "1");
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters = searchTerm || division || tourType;

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            All Tours
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our complete collection of handcrafted tours across
            Bangladesh
          </p>
        </div>

        {/* Filters Bar */}
        <Card className="mb-10 border-gray-200 dark:border-gray-800 shadow-sm">
          <CardContent className="">
            <form className="flex flex-col sm:flex-row flex-wrap gap-4 items-end">
              {/* Search Input */}
              <div className="flex-1 min-w-[240px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tour name, location..."
                    value={searchTerm}
                    onChange={(e) =>
                      updateParams({ searchTerm: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Division Filter */}
              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Division
                </label>
                <select
                  value={division}
                  onChange={(e) => updateParams({ division: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Divisions</option>
                  {divisionsData?.data?.map((div: any) => (
                    <option key={div._id} value={div._id}>
                      {div.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tour Type Filter */}
              <div className="w-full sm:w-48">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Tour Type
                </label>
                <select
                  value={tourType}
                  onChange={(e) => updateParams({ tourType: e.target.value })}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">All Types</option>
                  {tourTypesData?.data?.map((type: any) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-end gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!hasActiveFilters}
                  className="min-w-[100px]"
                >
                  {hasActiveFilters ? (
                    <>
                      <X className="mr-2 h-4 w-4" />
                      Reset
                    </>
                  ) : (
                    "Clear"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Tours Grid */}
        <div className="relative">
          {isFetching && (
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isFetching ? (
              Array.from({ length: limit }).map((_, i) => (
                <TourCardSkeleton key={i} />
              ))
            ) : tours.length > 0 ? (
              tours.map((tour: any) => <TourCard key={tour._id} tour={tour} />)
            ) : (
              <div className="col-span-full py-16">
                <Card className="text-center p-12 border-dashed">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    No tours found
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Try adjusting your filters or search term to find more
                    tours.
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={handleReset}>
                      Clear all filters
                    </Button>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && !isFetching && (
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      page > 1 && updateParams({ page: (page - 1).toString() })
                    }
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        onClick={() => updateParams({ page: p.toString() })}
                        isActive={page === p}
                        className="cursor-pointer"
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      page < totalPages &&
                      updateParams({ page: (page + 1).toString() })
                    }
                    className={
                      page === totalPages
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
    </section>
  );
}
