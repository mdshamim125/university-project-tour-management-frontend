/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck } from "lucide-react";

type BookingStatsChartProps = {
  data: any[];
};

const BookingStatsChart = ({ data }: BookingStatsChartProps) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Booking Distribution
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Bookings per tour overview
          </p>
        </div>
        <CalendarCheck className="h-5 w-5 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="bookingCount"
              nameKey="title"
              outerRadius={110}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BookingStatsChart;
