import {
  Users,
  CalendarCheck,
  DollarSign,
  Map,
  BarChart3,
  Loader2,
} from "lucide-react";

import BookingStatsChart from "@/components/modules/admin/analytics/BookingStatsChart";
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

export default function AdminAnalyticsPage() {
  const { data: userRes, isLoading: userLoading } = useGetUserStatsQuery();
  const { data: bookingRes, isLoading: bookingLoading } =
    useGetBookingStatsQuery();
  const { data: paymentRes, isLoading: paymentLoading } =
    useGetPaymentStatsQuery();
  const { data: tourRes, isLoading: tourLoading } = useGetTourStatsQuery();

  if (userLoading || bookingLoading || paymentLoading || tourLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const userStats = userRes?.data;
  const bookingStats = bookingRes?.data;
  const paymentStats = paymentRes?.data;
  const tourStats = tourRes?.data;

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          <BarChart3 size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Overview of platform performance, revenue, users, and tours.
          </p>
        </div>
      </div>

      {/* KPI Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={userStats?.totalUsers}
            icon={<Users size={24} />}
          />
          <StatCard
            title="Total Bookings"
            value={bookingStats?.totalBooking}
            icon={<CalendarCheck size={24} />}
          />
          <StatCard
            title="Total Revenue"
            value={`৳${paymentStats?.totalRevenue?.[0]?.totalRevenue || 0}`}
            icon={<DollarSign size={24} />}
          />
          <StatCard
            title="Total Tours"
            value={tourStats?.totalTour}
            icon={<Map size={24} />}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Analytics Insights</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserStatsChart data={userStats?.usersByRole} />
          <BookingStatsChart data={bookingStats?.bookingsPerTour} />
          <PaymentStatsChart data={paymentStats?.totalPaymentByStatus} />
          <TourStatsChart data={tourStats?.totalTourByTourType} />
        </div>
      </div>
    </div>
  );
}
