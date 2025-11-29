/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import {
  useGetAllToursQuery,
  useGetTourByIdQuery,
} from "@/redux/features/tour/tour.api";
import {
  Loader2,
  MapPin,
  DollarSign,
  CalendarDays,
  Users,
  List,
  CheckCircle,
  XCircle,
  Layers,
  Minus,
  Plus,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";

export default function Booking() {
  const { id } = useParams();

  // Fetch tour by ID
  const { data, isFetching } = useGetTourByIdQuery(id as string);
  const tour = data;

  const { data: tourData } = useGetAllToursQuery({ _id: id });
  const [createBooking] = useCreateBookingMutation();

  // ===============================
  // ⭐ Guest Count State
  // ===============================
  const [guestCount, setGuestCount] = useState(1);

  const handleIncrease = () => {
    if (guestCount < (tour?.maxGuest || 1)) {
      setGuestCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const handleBooking = async () => {
    let bookingData;

    if (tourData) {
      bookingData = {
        tour: id,
        guestCount: guestCount,
      };
    }
    console.log(bookingData);

    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        window.open(res.data.paymentUrl);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) {
    return (
      <Card className="p-10 text-center text-gray-500 shadow-sm mx-auto mt-10 max-w-lg">
        Tour not found.
      </Card>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-8">
      {/* ===== Banner Image ===== */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
        <img
          src={tour?.images?.[0] || "/placeholder.jpg"}
          alt={tour?.title}
          className="w-full h-full object-cover"
        />
        {tour?.tourType?.name && (
          <span className="absolute top-3 right-3 bg-primary text-white font-semibold text-sm px-3 py-1 rounded-full shadow-md">
            {tour.tourType.name}
          </span>
        )}
      </div>

      {/* ===== Main Tour Info ===== */}
      <Card className="shadow-md rounded-xl hover:shadow-xl transition-all">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {tour?.title}
          </h1>

          {/* Dates & Price */}
          <div className="flex flex-wrap justify-between gap-4 text-gray-700">
            <div className="flex items-center gap-2">
              <CalendarDays size={20} className="text-primary" />
              <span className="font-medium">
                {new Date(tour?.startDate).toLocaleDateString()} -{" "}
                {new Date(tour?.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-green-700">
              <DollarSign size={20} className="text-primary" />
              <span>Starts from ৳{tour?.costFrom || "N/A"}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600">{tour?.description}</p>

          {/* Key Info Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div className="flex items-center gap-2">
              <MapPin className="text-primary" />
              <span>
                <strong>Location:</strong> {tour?.location || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-primary" />
              <span>
                <strong>Guests:</strong> {tour?.maxGuest},{" "}
                <strong>Min Age:</strong> {tour?.minAge}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Layers className="text-primary" />
              <span>
                <strong>Division:</strong> {tour?.division?.name || "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <List className="text-primary" />
              <span>
                <strong>Tour Type:</strong> {tour?.tourType?.name || "N/A"}
              </span>
            </div>
          </div>

          {/* Included / Excluded */}
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-700">
                <CheckCircle /> Included
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {tour?.included?.map((item: any, idx: any) => (
                  <li key={idx}>{item}</li>
                )) || "N/A"}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                <XCircle /> Excluded
              </h3>
              <ul className="list-disc list-inside text-gray-700">
                {tour?.excluded?.map((item: any, idx: any) => (
                  <li key={idx}>{item}</li>
                )) || "N/A"}
              </ul>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-600">
              <Layers /> Amenities
            </h3>
            <p className="text-gray-700">
              {tour?.amenities?.join(", ") || "N/A"}
            </p>
          </div>

          {/* Tour Plan */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-purple-600">
              <List /> Tour Plan
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-1">
              {tour?.tourPlan?.map((plan: any, idx: any) => (
                <li key={idx}>{plan}</li>
              )) || "N/A"}
            </ol>
          </div>

          {/* =============================== */}
          {/* ⭐ Guest Selector UI */}
          {/* =============================== */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Users className="text-primary" /> Select Guests
            </h3>

            <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg w-max shadow-sm">
              <Button
                size="icon"
                variant="outline"
                onClick={handleDecrease}
                disabled={guestCount === 1}
                className="rounded-full w-10 h-10"
              >
                <Minus />
              </Button>

              <span className="text-xl font-semibold w-8 text-center">
                {guestCount}
              </span>

              <Button
                size="icon"
                variant="outline"
                onClick={handleIncrease}
                disabled={guestCount === tour?.maxGuest}
                className="rounded-full w-10 h-10"
              >
                <Plus />
              </Button>
            </div>

            <p className="text-gray-500 text-sm mt-1">
              Max allowed: <strong>{tour?.maxGuest}</strong> guests
            </p>

            {/* ⭐ TOTAL AMOUNT */}
            <div className="mt-4 bg-green-50 p-4 rounded-lg w-max shadow-sm border border-green-200">
              <div className="flex items-center gap-2 text-green-800">
                <DollarSign className="text-green-600" />
                <span className="font-semibold text-lg">
                  Total Amount: ৳{(tour?.costFrom || 0) * guestCount}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                ({guestCount} × ৳{tour?.costFrom})
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              onClick={handleBooking}
              className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              Book Now
            </Button>
            <Button
              variant="outline"
              className="text-primary border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all"
            >
              Contact Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
