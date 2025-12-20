/* eslint-disable @typescript-eslint/no-explicit-any */
// components/modules/admin/analytics/TourStatsChart.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";

interface TourStatsChartProps {
  data: any[];
}

export default function TourStatsChart({ data }: TourStatsChartProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            Tours by Type
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Distribution of tours based on tour category
          </p>
        </div>
        <Map className="h-6 w-6 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="_id"
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
