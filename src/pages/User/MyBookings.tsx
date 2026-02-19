/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Loader2,
  CalendarDays,
  AlertCircle,
  CreditCard,
  FileText,
  LayoutGrid,
  List,
} from "lucide-react";
import { Link } from "react-router";
import { useGetBookingsByUserQuery } from "@/redux/features/booking/booking.api";

// ────────────────────────────────────────────────
// Booking Status Config
// ────────────────────────────────────────────────
const BOOKING_STATUS = {
  PENDING: "PENDING",
  COMPLETE: "COMPLETE",
  CANCEL: "CANCEL",
  FAILED: "FAILED",
} as const;

type BookingStatus = keyof typeof BOOKING_STATUS;

const statusDisplay: Record<
  BookingStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  COMPLETE: {
    label: "Completed",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  CANCEL: {
    label: "Cancelled",
    className: "bg-gray-200 text-gray-800 border-gray-400",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-800 border-red-300",
  },
};

type ViewMode = "grid" | "list";

export default function MyBookings() {
  const {
    data: rawBookings = [],
    isLoading,
    isFetching,
    isError,
  } = useGetBookingsByUserQuery(undefined);

  // States
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>("grid"); // default to grid
  const itemsPerPage = 8;

  // Load saved view preference from localStorage (optional)
  useEffect(() => {
    const saved = localStorage.getItem("bookingsViewMode") as ViewMode;
    if (saved === "grid" || saved === "list") {
      setViewMode(saved);
    }
  }, []);

  // Save view preference
  useEffect(() => {
    localStorage.setItem("bookingsViewMode", viewMode);
  }, [viewMode]);

  // Filter
  const filteredBookings = rawBookings.filter((booking: any) =>
    statusFilter === "all" ? true : booking?.status === statusFilter,
  );

  // Pagination
  const totalItems = filteredBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedBookings = filteredBookings.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleStatusChange = (value: string) => {
    setStatusFilter(value as BookingStatus | "all");
    setCurrentPage(1);
  };

  // Loading
  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your bookings...</p>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <AlertCircle className="h-14 w-14 text-destructive" />
        <div>
          <h2 className="text-2xl font-semibold">Failed to load bookings</h2>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            Please try again later or contact support if the issue persists.
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Empty
  if (rawBookings.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 text-center px-4">
        <CreditCard className="h-20 w-20 text-muted-foreground/70" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            No bookings found
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-md mx-auto">
            You haven’t booked any tours yet. Start exploring and reserve your
            next adventure!
          </p>
        </div>
        <Button asChild size="lg" className="min-w-[220px]">
          <Link to="/tours">Browse Tours</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Header + Controls */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="mt-1.5 text-muted-foreground">
            View and manage all your tour reservations
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[220px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.entries(BOOKING_STATUS).map(([key, value]) => (
                <SelectItem key={key} value={value}>
                  {statusDisplay[key as BookingStatus]?.label || value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-3"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              className="h-9 px-3"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Content – Grid or List */}
      {viewMode === "grid" ? (
        /* Grid View (Cards) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedBookings.map((booking: any) => {
            const statusInfo = statusDisplay[
              booking.status as BookingStatus
            ] || {
              label: booking.status || "Unknown",
              className: "bg-gray-100 text-gray-800 border-gray-300",
            };

            return (
              <Card
                key={booking._id}
                className="overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-5 space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg leading-tight">
                      {booking.tour?.title || "Tour Booking"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground block text-xs">
                        Guests
                      </span>
                      <span className="font-medium">
                        {booking.guestCount || 1} people
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block text-xs">
                        Amount
                      </span>
                      <span className="font-medium">
                        ৳ {(booking.payment?.amount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge
                      variant="outline"
                      className={`${statusInfo.className} px-3 py-1 text-sm`}
                    >
                      {statusInfo.label}
                    </Badge>

                    {booking.payment?.invoiceUrl ? (
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          to={booking.payment.invoiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Invoice
                        </Link>
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No invoice
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        /* List View (Table) */
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead className="w-[35%]">Tour</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedBookings.map((booking: any) => {
                const statusInfo = statusDisplay[
                  booking.status as BookingStatus
                ] || {
                  label: booking.status || "Unknown",
                  className: "bg-gray-100 text-gray-800 border-gray-300",
                };

                return (
                  <TableRow
                    key={booking._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {booking.tour?.title || "—"}
                    </TableCell>
                    <TableCell>{booking.guestCount || 1} people</TableCell>
                    <TableCell className="font-medium">
                      ৳ {(booking.payment?.amount || 0).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${statusInfo.className} border-transparent px-3 py-1`}
                      >
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {booking.payment?.invoiceUrl ? (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            to={booking.payment.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center sm:justify-end">
          <Pagination>
            <PaginationContent className="gap-1 sm:gap-2">
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-muted"
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className={`min-w-[2.5rem] text-center cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "hover:bg-muted"
                      }`}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev === totalPages ? prev : prev + 1,
                    )
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer hover:bg-muted"
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

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useGetBookingsByUserQuery } from "@/redux/features/booking/booking.api";
// import { Loader2, CalendarDays, AlertCircle, FileText } from "lucide-react";
// import { Link } from "react-router";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// const MyBookings = () => {
//   const {
//     data: bookings,
//     isLoading,
//     isError,
//   } = useGetBookingsByUserQuery(undefined);

//   // --- Frontend state ---
//   const [statusFilter, setStatusFilter] = useState<
//     "PENDING" | "CANCEL" | "COMPLETE" | "FAILED" | "all"
//   >("all");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   // --- Filter bookings by status ---
//   const filteredBookings = bookings?.filter((booking: any) => {
//     if (statusFilter === "all") return true;
//     return booking?.status === statusFilter;
//   });

//   // --- Pagination calculation ---
//   const totalPage = Math.ceil((filteredBookings?.length || 0) / itemsPerPage);
//   const displayedBookings = filteredBookings?.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage,
//   );

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="animate-spin w-10 h-10 text-primary" />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex flex-col justify-center items-center h-64 text-red-600 gap-2">
//         <AlertCircle className="w-8 h-8" />
//         <p className="text-lg font-semibold">Failed to load bookings.</p>
//       </div>
//     );
//   }

//   if (!bookings || bookings.length === 0) {
//     return (
//       <div className="flex flex-col justify-center items-center h-64 text-red-600 gap-2">
//         <AlertCircle className="w-8 h-8" />
//         <p className="text-lg font-semibold">No bookings found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 md:px-8 py-10">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

//       {/* --- Status Filter --- */}
//       <div className="mb-4">
//         <label className="mr-2 font-medium text-gray-700">
//           Filter by Status:
//         </label>
//         <select
//           value={statusFilter}
//           onChange={(e) => {
//             setStatusFilter(e.target.value as any);
//             setCurrentPage(1);
//           }}
//           className="border px-4 py-2 rounded-lg"
//         >
//           <option value="all">All</option>
//           <option value="PENDING">Pending</option>
//           <option value="CANCEL">Cancel</option>
//           <option value="COMPLETE">Complete</option>
//           <option value="FAILED">Failed</option>
//         </select>
//       </div>

//       {/* --- Table --- */}
//       <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader className="bg-gray-50">
//             <TableRow>
//               <TableHead className="font-semibold text-gray-700">
//                 Tour Title
//               </TableHead>
//               <TableHead className="font-semibold text-gray-700">
//                 Guests
//               </TableHead>
//               <TableHead className="font-semibold text-gray-700">
//                 Amount
//               </TableHead>
//               <TableHead className="font-semibold text-gray-700">
//                 Status
//               </TableHead>
//               <TableHead className="font-semibold text-gray-700">
//                 Booking Date
//               </TableHead>
//               <TableHead className="font-semibold text-gray-700">
//                 Invoice
//               </TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {displayedBookings?.map((booking: any) => (
//               <TableRow key={booking._id}>
//                 <TableCell className="font-medium text-gray-800">
//                   {booking?.tour?.title}
//                 </TableCell>
//                 <TableCell>{booking?.guestCount} People</TableCell>
//                 <TableCell className="font-semibold text-gray-700">
//                   ৳ {booking?.payment?.amount || 0}
//                 </TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium
//                       ${
//                         booking?.status === "COMPLETE"
//                           ? "bg-green-100 text-green-700"
//                           : booking?.status === "FAILED"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                       }
//                     `}
//                   >
//                     {booking?.status}
//                   </span>
//                 </TableCell>
//                 <TableCell className="flex items-center gap-2 text-gray-700">
//                   <CalendarDays className="w-4 h-4" />
//                   {new Date(booking?.createdAt).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>
//                   {booking?.payment?.invoiceUrl ? (
//                     <Link
//                       to={booking?.payment?.invoiceUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
//                     >
//                       <FileText className="w-4 h-4" />
//                       View
//                     </Link>
//                   ) : (
//                     <span className="text-gray-400">N/A</span>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* --- Pagination --- */}
//       {totalPage > 1 && (
//         <div className="flex justify-end mt-4">
//           <Pagination>
//             <PaginationContent>
//               <PaginationItem>
//                 <PaginationPrevious
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   className={
//                     currentPage === 1
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 />
//               </PaginationItem>

//               {Array.from({ length: totalPage }, (_, i) => i + 1).map(
//                 (page) => (
//                   <PaginationItem
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                   >
//                     <PaginationLink
//                       className={`cursor-pointer ${currentPage === page ? "bg-primary text-white" : "hover:bg-muted"}`}
//                       isActive={currentPage === page}
//                     >
//                       {page}
//                     </PaginationLink>
//                   </PaginationItem>
//                 ),
//               )}

//               <PaginationItem>
//                 <PaginationNext
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.min(prev + 1, totalPage))
//                   }
//                   className={
//                     currentPage === totalPage
//                       ? "pointer-events-none opacity-50"
//                       : "cursor-pointer"
//                   }
//                 />
//               </PaginationItem>
//             </PaginationContent>
//           </Pagination>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;
