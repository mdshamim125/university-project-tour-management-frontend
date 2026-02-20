import { Users, CalendarCheck, Map, BarChart3, Loader2, Banknote } from "lucide-react";
import PaymentStatsChart from "@/components/modules/admin/analytics/PaymentStatsChart";
import StatCard from "@/components/modules/admin/analytics/StatCard";
import TourStatsChart from "@/components/modules/admin/analytics/TourStatsChart";
import UserStatsChart from "@/components/modules/admin/analytics/UserStatsChart";

import {
  useGetBookingStatsQuery,
  useGetPaymentStatsQuery,
  useGetTourStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/analytics/analytics.api";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminAnalyticsPage() {
  const { data: userRes, isLoading: userLoading } = useGetUserStatsQuery();
  const { data: bookingRes, isLoading: bookingLoading } = useGetBookingStatsQuery();
  const { data: paymentRes, isLoading: paymentLoading } = useGetPaymentStatsQuery();
  const { data: tourRes, isLoading: tourLoading } = useGetTourStatsQuery();

  const isLoading = userLoading || bookingLoading || paymentLoading || tourLoading;

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
        <div className="rounded-full bg-primary/10 p-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Loading Dashboard</h2>
          <p className="text-muted-foreground">Fetching latest platform analytics...</p>
        </div>
      </div>
    );
  }

  const userStats = userRes?.data;
  const bookingStats = bookingRes?.data;
  const paymentStats = paymentRes?.data;
  const tourStats = tourRes?.data;

  // Format total revenue with ৳ and k for thousands
  const totalRevenue = paymentStats?.totalRevenue?.[0]?.totalRevenue || 0;
  const formattedRevenue = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    notation: "compact",          // uses k for thousands
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(totalRevenue).replace("BDT", "৳"); // replace BDT with ৳

  return (
    <div className="space-y-12 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-sm">
            <BarChart3 size={36} />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Analytics Dashboard
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Real-time overview of platform performance, users, bookings, revenue, and tours
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={userStats?.totalUsers?.toLocaleString() || "0"}
            icon={<Users size={24} />}
          />
          <StatCard
            title="Total Bookings"
            value={bookingStats?.totalBooking?.toLocaleString() || "0"}
            icon={<CalendarCheck size={24} />}
          />
          <StatCard
            title="Total Revenue"
            value={formattedRevenue} // e.g. ৳489k
            icon={<Banknote size={24} />}
          />
          <StatCard
            title="Total Tours"
            value={tourStats?.totalTour?.toLocaleString() || "0"}
            icon={<Map size={24} />}
          />
        </div>
      </section>

      {/* Charts Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 tracking-tight">Detailed Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Users by Role</h3>
              {userStats?.usersByRole?.length ? (
                <UserStatsChart data={userStats.usersByRole} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No user role data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Bookings per Tour</h3>
              {bookingStats?.bookingsPerTour?.length ? (
                <BookingStatsChart data={bookingStats.bookingsPerTour} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No booking data available
                </div>
              )}
            </CardContent>
          </Card> */}

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Payment Status Breakdown</h3>
              {paymentStats?.totalPaymentByStatus?.length ? (
                <PaymentStatsChart data={paymentStats.totalPaymentByStatus} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No payment data available
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-none">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Tours by Type</h3>
              {tourStats?.totalTourByTourType?.length ? (
                <TourStatsChart data={tourStats.totalTourByTourType} />
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No tour type data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}