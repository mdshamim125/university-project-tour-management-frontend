/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, CalendarDays } from "lucide-react";
import { Link } from "react-router";

interface TourCardProps {
  tour: any;
}

export default function TourCard({ tour }: TourCardProps) {
  const divisionNames = Array.isArray(tour?.division)
    ? tour.division.map((d: any) => d?.name).join(", ")
    : tour?.division?.name || "Unknown Division";

  return (
    <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 duration-300 bg-white">
      {/* ===== Image Banner ===== */}
      <div className="relative h-40 sm:h-44 md:h-48">
        <img
          src={tour.images?.[0] || "/placeholder.jpg"}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        {tour.tourType?.name && (
          <span className="absolute top-2 right-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            {tour.tourType.name}
          </span>
        )}
      </div>

      {/* ===== Card Body ===== */}
      <CardContent className="">
        {/* Title */}
        <h2 className="text-md sm:text-lg font-semibold text-gray-900 mb-2 truncate">
          {tour.title}
        </h2>

        {/* Location & Division */}
        <div className="flex flex-col sm:flex-row sm:justify-between text-gray-600 text-sm mb-2 gap-1 sm:gap-0">
          <div className="flex items-center">
            <MapPin size={16} className="mr-1 text-primary" />
            <span className="truncate">
              Location: {tour.location || "Location N/A"}
            </span>
          </div>

          <div className="flex items-center">
            <CalendarDays size={16} className="mr-1 text-primary" />
            <span className="truncate">Division: {divisionNames}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center text-gray-800 font-medium mb-3">
          <DollarSign size={16} className="mr-1 text-primary" />
          <span>Starts from ৳{tour.costFrom || "N/A"}</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-2 gap-2">
          <Link to={`/tour/${tour._id}`}>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white transition-all"
            >
              View Details
            </Button>
          </Link>

          <Button className="bg-green-600 hover:bg-green-700 text-white transition-all">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
