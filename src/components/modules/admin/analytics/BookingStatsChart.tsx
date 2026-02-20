// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// interface BookingStatsChartProps {
//   data: any[] | undefined;
// }

// const COLORS = [
//   "#3b82f6", // blue
//   "#10b981", // emerald
//   "#f59e0b", // amber
//   "#ef4444", // red
//   "#8b5cf6", // violet
//   "#ec4899", // pink
//   "#f97316", // orange
// ];

// export default function BookingStatsChart({ data }: BookingStatsChartProps) {
//   // Handle empty/invalid data
//   if (!data || !Array.isArray(data) || data.length === 0) {
//     return (
//       <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-xl">Booking Distribution</CardTitle>
//           <CardDescription>Number of bookings per tour</CardDescription>
//         </CardHeader>
//         <CardContent className="h-[380px] flex flex-col items-center justify-center text-muted-foreground gap-4">
//           <div className="text-6xl opacity-30">📊</div>
//           <p className="text-xl font-medium text-center">No booking data available yet</p>
//           <p className="text-sm text-center max-w-md">
//             Bookings will appear here once users start reserving tours.
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   // Sort descending by booking count (biggest slices first)
//   const sortedData = [...data].sort((a, b) => b.bookingCount - a.bookingCount);

//   // Custom tooltip with clean formatting
//   const CustomTooltip = ({ active, payload }: any) => {
//     if (active && payload && payload.length) {
//       const item = payload[0].payload;
//       const tourName = item.tour?.title || "Unnamed Tour";
//       const count = item.bookingCount;
//       const total = sortedData.reduce((sum, d) => sum + d.bookingCount, 0);
//       const percent = ((count / total) * 100).toFixed(1);

//       return (
//         <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-200 min-w-[240px]">
//           <p className="font-semibold text-gray-900 text-base">{tourName}</p>
//           <div className="mt-2 text-sm text-gray-700 space-y-1">
//             <p><span className="font-medium">{count}</span> bookings</p>
//             <p><span className="font-medium">{percent}%</span> of total</p>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
//       <CardHeader className="pb-2 bg-gradient-to-r from-gray-50 to-white">
//         <CardTitle className="text-xl font-semibold">Booking Distribution</CardTitle>
//         <CardDescription className="text-sm">
//           Number of bookings per tour (top tours shown)
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="pt-4">
//         <div className="h-[380px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={sortedData}
//                 dataKey="bookingCount"
//                 nameKey="tour.title"               // ← uses nested tour.title
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={80}                   // donut style (modern)
//                 outerRadius={140}
//                 paddingAngle={4}
//                 label={({ tour, percent }) =>
//                   percent > 0.05
//                     ? `${tour?.title || "Unnamed Tour"} (${(percent * 100).toFixed(0)}%)`
//                     : null
//                 }
//                 labelLine={{ stroke: "#94a3b8", strokeWidth: 1.5 }}
//               >
//                 {sortedData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                     stroke="#fff"
//                     strokeWidth={2}
//                   />
//                 ))}
//               </Pie>

//               {/* Custom clean tooltip */}
//               <Tooltip content={<CustomTooltip />} />

//               {/* Legend on right with real tour names */}
//               <Legend
//                 wrapperStyle={{
//                   fontSize: "13px",
//                   paddingLeft: "20px",
//                   textAlign: "left",
//                 }}
//                 iconType="circle"
//                 layout="vertical"
//                 verticalAlign="middle"
//                 align="right"
//                 formatter={(value: string) => {
//                   // Show real tour title in legend
//                   const item = sortedData.find(d => d.tour?.title === value);
//                   return item?.tour?.title || value || "Unnamed Tour";
//                 }}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

const BookingStatsChart = () => {
  return <div></div>;
};

export default BookingStatsChart;
