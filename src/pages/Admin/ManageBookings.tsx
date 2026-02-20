// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { format } from "date-fns";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   List,
//   Grid,
//   DollarSign,
//   Clock,
//   CheckCircle2,
//   AlertCircle,
// } from "lucide-react";

// import { useGetAllBookingsQuery } from "@/redux/features/booking/booking.api";

// export default function ManageBookings() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [limit] = useState(8);
//   const [statusFilter, setStatusFilter] = useState("");
//   const [viewMode, setViewMode] = useState<"list" | "grid">("list");

//   const query: Record<string, string> = {
//     page: currentPage.toString(),
//     limit: limit.toString(),
//   };

//   // Only add status if it's not "all"
//   if (statusFilter && statusFilter !== "all") {
//     query.status = statusFilter;
//   }

//   const { data, isFetching } = useGetAllBookingsQuery(query);

//   const bookings = data?.data ?? [];
//   const totalPage = data?.meta?.totalPage || 1;

//   const getStatusBadge = (status: string) => {
//     const upper = status?.toUpperCase();
//     switch (upper) {
//       case "COMPLETE":
//         return (
//           <Badge className="bg-green-600 hover:bg-green-700">
//             <CheckCircle2 className="h-3 w-3 mr-1" /> Complete
//           </Badge>
//         );
//       case "PENDING":
//         return (
//           <Badge
//             variant="secondary"
//             className="bg-amber-500 hover:bg-amber-600 text-white"
//           >
//             <Clock className="h-3 w-3 mr-1" /> Pending
//           </Badge>
//         );
//       case "FAILED":
//         return (
//           <Badge variant="destructive">
//             <AlertCircle className="h-3 w-3 mr-1" /> Failed
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">{status || "Unknown"}</Badge>;
//     }
//   };

//   const formatCurrency = (amount?: number) => {
//     return amount ? `৳${amount.toLocaleString()}` : "—";
//   };

//   const formatDate = (dateString?: string) => {
//     if (!dateString) return "—";
//     try {
//       return format(new Date(dateString), "MMM dd, yyyy");
//     } catch {
//       return "Invalid date";
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 px-4">
//       {/* Header + Controls */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
//           <p className="text-muted-foreground mt-1">
//             View and track all tour bookings in one place
//           </p>
//         </div>

//         <div className="flex items-center gap-4 flex-wrap">
//           {/* View Toggle */}
//           <Tabs
//             value={viewMode}
//             onValueChange={(v) => setViewMode(v as "list" | "grid")}
//             className="w-[180px]"
//           >
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="list">
//                 <List className="h-4 w-4 mr-2" />
//                 List
//               </TabsTrigger>
//               <TabsTrigger value="grid">
//                 <Grid className="h-4 w-4 mr-2" />
//                 Grid
//               </TabsTrigger>
//             </TabsList>
//           </Tabs>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 mb-6">
//         <Select
//           value={statusFilter}
//           onValueChange={(value) => {
//             setStatusFilter(value);
//             setCurrentPage(1);
//           }}
//         >
//           <SelectTrigger className="w-[200px]">
//             <SelectValue placeholder="All Status" />
//           </SelectTrigger>
//           <SelectContent>
//             {/* Use "all" instead of empty string */}
//             <SelectItem value="all">All Status</SelectItem>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="COMPLETE">Complete</SelectItem>
//             <SelectItem value="FAILED">Failed</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Content */}
//       {isFetching ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {[...Array(8)].map((_, i) => (
//             <Skeleton key={i} className="h-48 w-full rounded-xl" />
//           ))}
//         </div>
//       ) : bookings.length === 0 ? (
//         <div className="text-center py-16 border rounded-lg bg-muted/30">
//           <h3 className="text-xl font-medium">No bookings found</h3>
//           <p className="text-muted-foreground mt-2">
//             Try adjusting your search or status filter
//           </p>
//         </div>
//       ) : viewMode === "list" ? (
//         /* ─── LIST VIEW (Table) ─── */
//         <div className="border rounded-lg overflow-hidden">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>User</TableHead>
//                 <TableHead>Tour</TableHead>
//                 <TableHead>Guests</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Payment</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {bookings.map((booking: any) => (
//                 <TableRow
//                   key={booking._id}
//                   className="hover:bg-muted/50 transition-colors"
//                 >
//                   <TableCell>
//                     <div className="font-medium">
//                       {booking.user?.name || "—"}
//                     </div>
//                     <div className="text-xs text-muted-foreground">
//                       {booking.user?.email || "—"}
//                     </div>
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {booking.tour?.title || "—"}
//                   </TableCell>
//                   <TableCell>{booking.guestCount || 0}</TableCell>
//                   <TableCell>{getStatusBadge(booking.status)}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         booking.payment?.status === "PAID"
//                           ? "default"
//                           : "secondary"
//                       }
//                     >
//                       {booking.payment?.status || "—"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     {formatCurrency(booking.payment?.amount)}
//                   </TableCell>
//                   <TableCell className="text-sm text-muted-foreground">
//                     {formatDate(booking.createdAt)}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       ) : (
//         /* ─── GRID VIEW (Cards) ─── */
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {bookings.map((booking: any) => (
//             <Card
//               key={booking._id}
//               className="overflow-hidden hover:shadow-md transition-all"
//             >
//               <CardContent className="p-5 space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-lg line-clamp-2">
//                     {booking.tour?.title || "Untitled Tour"}
//                   </h3>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     {booking.user?.name || "Unknown User"}
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {getStatusBadge(booking.status)}
//                   <Badge variant="outline">
//                     {booking.guestCount || 0} Guest
//                     {booking.guestCount !== 1 ? "s" : ""}
//                   </Badge>
//                 </div>

//                 <div className="flex justify-between items-center pt-2 border-t">
//                   <div className="flex items-center gap-2 text-sm">
//                     <DollarSign className="h-4 w-4 text-primary" />
//                     <span className="font-medium">
//                       {formatCurrency(booking.payment?.amount)}
//                     </span>
//                   </div>

//                   <div className="text-xs text-muted-foreground">
//                     {formatDate(booking.createdAt)}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {/* Pagination */}
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
//                       className={`cursor-pointer ${
//                         currentPage === page
//                           ? "bg-primary text-white"
//                           : "hover:bg-muted"
//                       }`}
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
//                     setCurrentPage((prev) =>
//                       prev === totalPage ? prev : prev + 1,
//                     )
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
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { format } from "date-fns";
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
import {
  List,
  Grid,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Receipt,
  Clock,
  Users,
} from "lucide-react";

import { useGetAllBookingsQuery } from "@/redux/features/booking/booking.api";

export default function ManageBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const query: Record<string, string> = {
    page: currentPage.toString(),
    limit: limit.toString(),
  };

  if (statusFilter && statusFilter !== "all") {
    query.status = statusFilter;
  }

  const { data, isFetching } = useGetAllBookingsQuery(query);

  const bookings = data?.data ?? [];
  const totalPage = data?.meta?.totalPage || 1;

  const getStatusBadge = (status: string) => {
    const upper = status?.toUpperCase();
    switch (upper) {
      case "COMPLETE":
        return (
          <Badge className="bg-green-600 hover:bg-green-700 gap-1">
            <CheckCircle2 className="h-3 w-3" /> Complete
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      case "FAILED":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircle className="h-3 w-3" /> Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status || "Unknown"}</Badge>;
    }
  };

  const formatCurrency = (amount?: number) => {
    return amount ? `৳${amount.toLocaleString()}` : "—";
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Bookings</h1>
          <p className="text-muted-foreground mt-1">
            View and monitor all tour bookings
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as "list" | "grid")}
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
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user, tour or transaction ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div> */}

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="COMPLETE">Complete</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {isFetching ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/30">
          <h3 className="text-xl font-medium">No bookings found</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or status filter
          </p>
        </div>
      ) : viewMode === "list" ? (
        /* ─── LIST VIEW (Table) ─── */
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking: any) => (
                <TableRow
                  key={booking._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <div className="font-medium">
                      {booking.user?.name || "—"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {booking.user?.email || "—"}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {booking.tour?.title || "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm">
                        {booking.payment?.transactionId || "—"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(booking.payment?.amount)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(booking.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        /* ─── GRID VIEW (Cards) ─── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookings.map((booking: any) => (
            <Card
              key={booking._id}
              className="overflow-hidden hover:shadow-md transition-all"
            >
              <CardContent className="p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {booking.tour?.title || "Untitled Tour"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {booking.user?.name || "Unknown User"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(booking.status)}
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {booking.guestCount || 0}
                  </Badge>
                </div>

                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {formatCurrency(booking.payment?.amount)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(booking.createdAt)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Receipt className="h-4 w-4" />
                    <span className="font-mono truncate max-w-[140px]">
                      {booking.payment?.transactionId || "No Transaction ID"}
                    </span>
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
