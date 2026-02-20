/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, List, Grid, Search } from "lucide-react";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import {
  useGetAllToursQuery,
  useRemoveTourMutation,
} from "@/redux/features/tour/tour.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";

export default function ManageTours() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTourType, setFilterTourType] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const { data: tourTypesData } = useGetTourTypesQuery({});

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
    searchTerm,
  };

  if (filterTourType && filterTourType !== "all") {
    query.tourType = filterTourType;
  }

  const { data, isFetching } = useGetAllToursQuery(query);
  const [removeTour] = useRemoveTourMutation();

  const tours = data?.data ?? [];
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
    setCurrentPage(1);
  };

  const tourTypes = tourTypesData?.data ?? [];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Tours</h1>
          <p className="text-muted-foreground mt-1">
            View, edit, and manage all available tour packages
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* View Toggle */}
          <Tabs
            value={viewMode}
            onValueChange={(v: any) => setViewMode(v as "list" | "grid")}
            className="w-[180px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">
                <List className="h-4 w-4 mr-2" />
                List
              </TabsTrigger>
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Add New Tour Button */}
          <Button asChild>
            <Link to="/admin/tour/add">Add New Tour</Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <form onSubmit={handleSearch}>
            <Input
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </form>
        </div>

        <Select
          value={filterTourType}
          onValueChange={(value) => {
            setFilterTourType(value === "all" ? "" : value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="All Tour Types" />
          </SelectTrigger>
          <SelectContent>
            {/* Use "all" instead of "" */}
            <SelectItem value="all">All Tour Types</SelectItem>

            {tourTypes.map((type: any) => (
              <SelectItem key={type._id} value={type._id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {isFetching ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : tours.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/30">
          <h3 className="text-xl font-medium">No tours found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filter criteria
          </p>
          <Button asChild className="mt-6">
            <Link to="/admin/tour/add">Add New Tour</Link>
          </Button>
        </div>
      ) : viewMode === "list" ? (
        /* ─── LIST VIEW (Table) ─── */
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Title & Location</TableHead>
                <TableHead>Tour Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tours.map((tour: any) => (
                <TableRow
                  key={tour._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <div className="font-medium">{tour.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {tour.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {tour.tourType?.name || "Uncategorized"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/admin/tour/edit/${tour._id}`}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>

                    <DeleteConfirmation
                      onConfirm={() => handleRemove(tour._id)}
                    >
                      <Button size="sm" >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* ─── GRID VIEW (Cards) ─── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map((tour: any) => (
            <Card
              key={tour._id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-5">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tour.location}
                  </p>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline">
                      {tour.tourType?.name || "Uncategorized"}
                    </Badge>

                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link to={`/admin/tour/edit/${tour._id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>

                      <DeleteConfirmation
                        onConfirm={() => handleRemove(tour._id)}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className=""
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DeleteConfirmation>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
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
                ),
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev === totalPage ? prev : prev + 1,
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
