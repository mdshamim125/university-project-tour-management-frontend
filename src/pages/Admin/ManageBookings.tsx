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
import { useGetAllBookingsQuery } from "@/redux/features/booking/booking.api";

export default function ManageBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [statusFilter, setStatusFilter] = useState("");

  // build query for pagination + status filter
  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
  };

  if (statusFilter) query.status = statusFilter;

  const { data, isFetching } = useGetAllBookingsQuery(query);
  const totalPage = data?.meta?.totalPage || 1;

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex flex-col justify-between min-h-[calc(100vh-120px)]">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center my-8 flex-wrap gap-3">
            <h1 className="text-xl font-semibold">Manage Bookings</h1>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setCurrentPage(1);
                setStatusFilter(e.target.value);
              }}
              className="border rounded-md p-2 w-48"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETE">Complete</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          {/* Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length ? (
                  data.data.map((booking: any) => (
                    <TableRow key={booking._id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.user?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {booking.user?.email}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>{booking.tour?.title}</TableCell>
                      <TableCell>{booking.guestCount}</TableCell>
                      <TableCell>
                        <span className="font-medium">{booking.status}</span>
                      </TableCell>
                      <TableCell>{booking.payment?.status}</TableCell>
                      <TableCell>৳{booking.payment?.amount}</TableCell>
                      <TableCell>
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No bookings found.
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
      </div>
    </div>
  );
}
