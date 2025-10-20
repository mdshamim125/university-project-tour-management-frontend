"use client";

import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
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
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  useGetDivisionsQuery,
  useRemoveDivisionMutation,
} from "@/redux/features/division/division.api";
import { AddDivisionModal } from "@/components/modules/admin/division/AddDivision";

export default function AddDivision() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { data } = useGetDivisionsQuery({ page: currentPage, limit });
  const [removeDivision] = useRemoveDivisionMutation();

  console.log("Division data:", data);

  const handleRemoveDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeDivision(divisionId).unwrap();

      if (res.success) {
        toast.success("Removed Division", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove division", { id: toastId });
    }
  };

  const totalPage = data?.meta?.totalPage;
  console.log(totalPage);

  return (
    <div className="w-full  max-w-7xl mx-auto px-5">
      <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
        <div>
          <div className="flex justify-between my-8">
            <h1 className="text-xl font-semibold">List of Divisions</h1>
            <AddDivisionModal />
          </div>

          <div className="border border-muted rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Name</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data?.map((item: { _id: string; name: string }) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium w-full">
                      {item.name}
                    </TableCell>
                    <TableCell>
                      <DeleteConfirmation
                        onConfirm={() => handleRemoveDivision(item._id)}
                      >
                        <Button size="sm" variant="destructive">
                          <Trash2 />
                        </Button>
                      </DeleteConfirmation>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div>
          {totalPage > 1 && (
            <div className="flex justify-end mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((prev) => prev - 1)}
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
                      onClick={() => setCurrentPage((prev) => prev + 1)}
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
