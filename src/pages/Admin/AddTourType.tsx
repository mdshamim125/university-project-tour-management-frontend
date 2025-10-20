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
  useGetTourTypesQuery,
  useRemoveTourTypeMutation,
} from "@/redux/features/tour/tour.api";
import { AddTourTypeModal } from "@/components/modules/admin/tourType/AddTourType";

export default function AddTourType() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { data } = useGetTourTypesQuery({ page: currentPage, limit });
  const [removeTourType] = useRemoveTourTypeMutation();

  const handleRemoveTourType = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await removeTourType(tourId).unwrap();

      if (res.success) {
        toast.success("Removed Tour Type", { id: toastId });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  //* Total page 2 => [0, 0]

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
        <div>
          <div className="flex justify-between my-8">
            <h1 className="text-xl font-semibold">List of Tour Types</h1>
            <AddTourTypeModal />
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
                  <TableRow>
                    <TableCell className="font-medium w-full">
                      {item?.name}
                    </TableCell>
                    <TableCell>
                      <DeleteConfirmation
                        onConfirm={() => handleRemoveTourType(item._id)}
                      >
                        <Button size="sm">
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
