/* eslint-disable @typescript-eslint/no-explicit-any */
// components/dashboard/UserStatsChart.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface UserStatsChartProps {
  data: any[];
}

export default function UserStatsChart({ data }: UserStatsChartProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Users by Role
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Breakdown of registered users based on their roles
        </p>
      </CardHeader>

      <CardContent className="h-[300px]">
        {data?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="_id" tickLine={false} axisLine={false} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="count"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-sm text-muted-foreground">
            No user data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
