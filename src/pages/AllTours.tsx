/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useSearchParams } from "react-router";
import TourCardSkeleton from "@/components/skeletons/TourCardSkeleton";

export default function AllTours() {
  //   const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // ---------- Extract params ----------
  const searchTerm = searchParams.get("searchTerm") || "";
  const filterDivision = searchParams.get("division") || "";
  const filterTourType = searchParams.get("tourType") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = 6;

  // ---------- Queries ----------
  const { data: divisions } = useGetDivisionsQuery({});
  const { data: tourTypes } = useGetTourTypesQuery({});
  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
  };
  if (searchTerm) query.searchTerm = searchTerm;
  if (filterDivision) query.division = filterDivision;
  if (filterTourType) query.tourType = filterTourType;

  const { data, isFetching } = useGetAllToursQuery(query);
  const tours = data?.data || [];
  const totalPage = data?.meta?.totalPage || 1;

  // ---------- Handlers ----------
  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ searchTerm, page: "1" });
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams());
  };

  // ---------- Render ----------
  return (
    <div className="mx-auto  md:px-16 px-8 md:py-10 py-6">
      <h1 className="text-3xl font-semibold mb-8 text-center">All Tours</h1>

      {/* 🔹 Filters */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap justify-center items-center gap-4 mb-10"
      >
        <Input
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => updateParams({ searchTerm: e.target.value })}
          className="w-60"
        />

        {/* Division Filter */}
        <select
          value={filterDivision}
          onChange={(e) =>
            updateParams({ division: e.target.value, page: "1" })
          }
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
          onChange={(e) =>
            updateParams({ tourType: e.target.value, page: "1" })
          }
          className="border border-gray-300 rounded-md p-2 w-48"
        >
          <option value="">All Tour Types</option>
          {tourTypes?.data?.map((type: any) => (
            <option key={type._id} value={type._id}>
              {type.name}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        <div className="w-28 flex justify-center">
          {searchTerm || filterDivision || filterTourType ? (
            <Button
              type="button"
              className="p-5"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          ) : (
            <div className="h-10 w-24"></div>
          )}
        </div>
      </form>

      {/* 🔹 Tours Grid */}
      {/* 🔹 Tours Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[30vh]">
        {isFetching ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TourCardSkeleton key={index} />
          ))
        ) : tours.length > 0 ? (
          tours.map((tour: any) => <TourCard key={tour._id} tour={tour} />)
        ) : (
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
                    updateParams({
                      page: (currentPage - 1).toString(),
                    })
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
                      onClick={() => updateParams({ page: page.toString() })}
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
                    updateParams({
                      page:
                        currentPage === totalPage
                          ? totalPage.toString()
                          : (currentPage + 1).toString(),
                    })
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
