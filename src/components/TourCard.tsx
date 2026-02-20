// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, DollarSign, CalendarDays } from "lucide-react";
// import { Link } from "react-router";

// interface TourCardProps {
//   tour: any;
// }

// export default function TourCard({ tour }: TourCardProps) {
//   const divisionNames = Array.isArray(tour?.division)
//     ? tour.division.map((d: any) => d?.name).join(", ")
//     : tour?.division?.name || "Unknown Division";

//   return (
//     <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300 bg-white">
//       {/* ===== Image Banner ===== */}
//       <div className="relative h-40 sm:h-44 md:h-48">
//         <img
//           src={tour.images?.[0] || "/placeholder.jpg"}
//           alt={tour.title}
//           className="w-full h-full object-cover"
//         />
//         {tour.tourType?.name && (
//           <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
//             {tour.tourType.name}
//           </span>
//         )}
//       </div>

//       {/* ===== Card Body ===== */}
//       <CardContent className="">
//         {/* Title */}
//         <h2 className="text-md sm:text-lg font-semibold text-gray-900 mb-2 truncate">
//           {tour.title}
//         </h2>

//         {/* Location & Division */}
//         <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm mb-2 gap-1 sm:gap-0">
//           <div className="flex items-center">
//             <MapPin size={16} className="mr-1 text-primary" />
//             <span className="truncate">
//               Location: {tour.location || "Location N/A"}
//             </span>
//           </div>

//           <div className="flex items-center">
//             <CalendarDays size={16} className="mr-1 text-primary" />
//             <span className="truncate">Division: {divisionNames}</span>
//           </div>
//         </div>

//         {/* Price */}
//         <div className="flex items-center text-gray-800 font-medium mb-3">
//           <DollarSign size={16} className="mr-1 text-primary" />
//           <span>Starts from ৳{tour.costFrom || "N/A"}</span>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between mt-2 gap-2">
//           <Link to={`/tour/${tour._id}`}>
//             <Button
//               variant="outline"
//               className="text-primary border-primary hover:bg-primary hover:text-white transition-all"
//             >
//               View Details
//             </Button>
//           </Link>

//           <Button className="bg-green-600 hover:bg-green-700 text-white transition-all">
//             <Link to={`/booking/${tour._id}`}>Book Now</Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router"; // assuming react-router-dom (fix if using react-router)

interface TourCardProps {
  tour: any;
}

export default function TourCard({ tour }: TourCardProps) {
  const divisionNames = Array.isArray(tour?.division)
    ? tour.division
        .map((d: any) => d?.name)
        .filter(Boolean)
        .join(", ")
    : tour?.division?.name || "N/A";

  const imageUrl = tour.images?.[0] || "/images/placeholder-tour.jpg";

  return (
    <Card
      className="
        group overflow-hidden rounded-2xl border border-gray-200 
        bg-white shadow-sm hover:shadow-xl hover:border-gray-300 
        transition-all duration-300 ease-out
        h-full flex flex-col
      "
    >
      {/* Image + Badge Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.title || "Tour image"}
          className="
            w-full h-full object-cover 
            transition-transform duration-500 
            group-hover:scale-105
          "
          loading="lazy"
        />

        {/* Subtle gradient overlay for better badge visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Tour Type Badge */}
        {tour.tourType?.name && (
          <span
            className="
              absolute top-3 right-3 z-10
              bg-primary/90 backdrop-blur-sm text-white 
              text-xs font-semibold px-3 py-1.5 rounded-full 
              shadow-md ring-1 ring-white/20
            "
          >
            {tour.tourType.name}
          </span>
        )}

        {/* Optional: Duration badge (if available) */}
        {tour.duration && (
          <span
            className="
              absolute bottom-3 left-3 z-10
              bg-black/60 text-white text-xs font-medium 
              px-2.5 py-1 rounded-full flex items-center gap-1
            "
          >
            <Clock size={14} />
            {tour.duration}
          </span>
        )}
      </div>

      {/* Content */}
      <CardContent className="flex-1 flex flex-col p-5 md:p-6">
        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2.5 line-clamp-2">
          {tour.title}
        </h3>

        {/* Meta Info */}
        <div className="space-y-2.5 flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 mb-4">
          {/* Location */}
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">
              {tour.location || "Multiple Locations"}
            </span>
          </div>

          {/* Division */}
          <div className="flex items-center gap-1.5">
            <CalendarDays size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">{divisionNames}</span>
          </div>
        </div>

        {/* Price – emphasized */}
        <div className="mt-auto mb-5">
          <div className="flex items-baseline gap-1.5">
            {/* <DollarSign size={18} className="text-primary" /> */}
            <span className="text-2xl md:text-2.5xl font-extrabold text-gray-900">
              ৳{tour.costFrom?.toLocaleString() || "—"}
            </span>
            <span className="text-sm text-gray-500">/ person</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="
              flex-1 border-primary text-primary 
              hover:bg-primary hover:text-white 
              transition-colors
            "
            asChild
          >
            <Link to={`/tour/${tour._id}`}>View Details</Link>
          </Button>

          <Button
            size="sm"
            className="
              flex-1 bg-green-600 hover:bg-green-700 
              text-white font-medium transition-colors
            "
            asChild
          >
            <Link to={`/booking/${tour._id}`}>Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
