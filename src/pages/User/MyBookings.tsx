/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetBookingsByUserQuery } from "@/redux/features/booking/booking.api";
import { Loader2, CalendarDays, AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router";

const MyBookings = () => {
  const {
    data: bookings,
    isLoading,
    isError,
  } = useGetBookingsByUserQuery(undefined);

  console.log(bookings);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-600 gap-2">
        <AlertCircle className="w-8 h-8" />
        <p className="text-lg font-semibold">Failed to load bookings.</p>
      </div>
    );
  }
  if (bookings?.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-600 gap-2">
        <AlertCircle className="w-8 h-8" />
        <p className="text-lg font-semibold">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700">
                Tour Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Guests
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Amount
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Payment Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Payment Date
              </TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">
                Invoice
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {bookings?.map((booking: any) => (
              <TableRow key={booking._id}>
                {/* Tour Name */}
                <TableCell className="font-medium text-gray-800">
                  {booking?.tour?.title}
                </TableCell>

                {/* Guest Count */}
                <TableCell>{booking?.guestCount} People</TableCell>

                {/* Amount */}
                <TableCell className="font-semibold text-gray-700">
                  ৳ {booking?.payment?.amount}
                </TableCell>

                {/* Payment */}
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                      ${
                        booking?.payment?.status === "success"
                          ? "bg-green-100 text-green-700"
                          : booking?.payment?.status === "fail"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {booking?.payment?.status}
                  </span>
                </TableCell>

                {/* Booking Date */}
                <TableCell className="flex items-center gap-2 text-gray-700">
                  <CalendarDays className="w-4 h-4" />
                  {new Date(booking?.createdAt).toLocaleDateString()}
                </TableCell>

                {/* Invoice Button */}
                <TableCell className="text-right">
                  <Link
                    to={booking?.payment?.invoiceUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    <FileText className="w-4 h-4" />
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyBookings;
