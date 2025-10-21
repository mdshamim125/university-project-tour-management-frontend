/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import {
  useGetAllToursQuery,
  useRemoveTourMutation,
} from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api"; // import your tour types query
import { Link } from "react-router";

export default function ManageTours() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTourType, setFilterTourType] = useState("");

  const { data: tourTypes } = useGetTourTypesQuery({}); // fetch tour types

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
    searchTerm,
  };

  // only add tourType if a type is selected
  if (filterTourType) {
    query.tourType = filterTourType;
  }

  const { data, isFetching } = useGetAllToursQuery(query);
  const [removeTour] = useRemoveTourMutation();

  const totalPage = data?.meta?.totalPage || 1;

  const handleRemove = async (id: string) => {
    const toastId = toast.loading("Deleting tour...");
    try {
      const res = await removeTour(id).unwrap();
      if (res.success) {
        toast.success("Tour removed successfully", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete tour", { id: toastId });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // reset page when searching
  };

  console.log(data);

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center my-8 flex-wrap gap-3">
            <h1 className="text-xl font-semibold">Manage Tours</h1>

            {/* Search and Filter */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-3 flex-wrap"
            >
              <Input
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-60"
              />
              <select
                value={filterTourType}
                onChange={(e) => setFilterTourType(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-48"
              >
                <option value="">All Tour Types</option>
                {tourTypes?.data?.map((type: any) => (
                  <option key={type._id} value={type._id}>
                    {" "}
                    {/* use _id here */}
                    {type.name}
                  </option>
                ))}
              </select>
              {/* <Button type="submit">Search</Button> */}
            </form>
          </div>

          {/* Table */}
          <div className="border border-muted rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Title</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Tour Type</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length ? (
                  data?.data?.map((tour: any) => (
                    <TableRow key={tour._id}>
                      <TableCell className="font-medium">
                        {tour.title}
                      </TableCell>
                      <TableCell>{tour.location}</TableCell>
                      <TableCell>{tour.tourType.name}</TableCell>
                      <TableCell className="flex text-center gap-2">
                        {/* Edit button */}
                        <Link to={`/admin/tour/edit/${tour._id}`}>
                          <Button size="sm" variant="outline">
                            <Pencil size={16} />
                          </Button>
                        </Link>

                        {/* Delete button */}
                        <DeleteConfirmation
                          onConfirm={() => handleRemove(tour._id)}
                        >
                          <Button size="sm" variant="destructive">
                            <Trash2 size={16} />
                          </Button>
                        </DeleteConfirmation>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No tours found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div>
          {totalPage > 1 && (
            <div className="flex justify-end mt-4">
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
                      <PaginationItem
                        key={page}
                        onClick={() => setCurrentPage(page)}
                      >
                        <PaginationLink
                          className={`cursor-pointer ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "hover:bg-muted"
                          }`}
                          isActive={currentPage === page}
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
      </div>
    </div>
  );
}
