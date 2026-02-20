/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useParams } from "react-router";
import { format } from "date-fns";
import { useGetTourByIdQuery } from "@/redux/features/tour/tour.api";
import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Booking() {
  const { id } = useParams();

  const { data: tour, isFetching, isError } = useGetTourByIdQuery(id as string);
  const [createBooking, { isLoading: isBooking }] = useCreateBookingMutation();

  // Guest count
  const [guestCount, setGuestCount] = useState(1);

  // Image carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const maxGuests = tour?.maxGuest || 1;
  const images = tour?.images?.length ? tour.images : ["/placeholder-tour.jpg"];

  const handleIncrease = () => {
    if (guestCount < maxGuests) {
      setGuestCount((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (guestCount > 1) {
      setGuestCount((prev) => prev - 1);
    }
  };

  const totalAmount = (tour?.costFrom || 0) * guestCount;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleBooking = async () => {
    if (!tour?._id) {
      toast.error("Tour information is missing");
      return;
    }

    const bookingData = {
      tour: tour._id,
      guestCount,
    };

    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success && res.data?.paymentUrl) {
        toast.success("Redirecting to payment...");
        window.open(res.data.paymentUrl, "_self");
      } else {
        toast.error("Booking failed. No payment URL received.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create booking");
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Preparing booking details...</p>
        </div>
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <Card className="max-w-lg text-center p-10 shadow-lg">
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-bold text-destructive">
              Tour Not Found
            </h2>
            <p className="text-muted-foreground">
              We couldn't find this tour. It may have been removed or is
              unavailable.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/tours">Browse All Tours</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-24">
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        {/* Hero Image Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 md:mb-16">
          <div className="relative aspect-[4/3] md:aspect-[16/7] bg-gray-200">
            <img
              src={images[currentImageIndex]}
              alt={`${tour.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm z-10"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm z-10"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm z-10">
                  {images.map((idx: any) => (
                    <button
                      key={idx}
                      className={cn(
                        "w-3 h-3 rounded-full transition-all duration-300",
                        idx === currentImageIndex
                          ? "bg-white scale-125 shadow-md"
                          : "bg-white/60 hover:bg-white/90",
                      )}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Tour Type Badge */}
            {tour.tourType?.name && (
              <Badge className="absolute top-5 right-5 md:top-6 md:right-6 bg-primary/90 hover:bg-primary text-white text-base px-4 py-1.5 shadow-lg z-10">
                {tour.tourType.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 xl:gap-12">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-10 md:space-y-12">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {tour.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground text-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{tour.location || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <span>
                    {format(new Date(tour.startDate), "MMM dd, yyyy")} —{" "}
                    {format(new Date(tour.endDate), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-bold text-xl text-primary">
                  <DollarSign className="h-6 w-6" />
                  <span>৳{tour.costFrom?.toLocaleString() || "N/A"}</span>
                </div>
              </div>
            </div>

            <Separator className="my-8 md:my-10" />

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">
                Tour Overview
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {tour.description || "No detailed description available."}
              </p>
            </div>

            {/* Included / Excluded */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-3 text-green-700">
                    <CheckCircle className="h-6 w-6" />
                    What's Included
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    {tour.included?.length ? (
                      tour.included.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">
                        No inclusions specified
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-3 text-red-600">
                    <XCircle className="h-6 w-6" />
                    What's Excluded
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    {tour.excluded?.length ? (
                      tour.excluded.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">
                        No exclusions specified
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Amenities */}
            {tour.amenities?.length > 0 && (
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-semibold mb-5 flex items-center gap-3 text-blue-700">
                    <Layers className="h-6 w-6" />
                    Amenities & Facilities
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {tour.amenities.map((amenity: string, idx: number) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="px-4 py-2 text-base bg-blue-50 text-blue-800 hover:bg-blue-100 transition-colors"
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tour Plan */}
            {tour.tourPlan?.length > 0 && (
              <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <List className="h-7 w-7 text-purple-600" />
                    Detailed Itinerary
                  </h2>
                  <ol className="space-y-6">
                    {tour.tourPlan.map((plan: string, idx: number) => (
                      <li key={idx} className="relative pl-10">
                        <div className="absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-800 leading-relaxed">{plan}</p>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:sticky lg:top-8 lg:h-fit space-y-6">
            <Card className="border-none shadow-xl bg-white">
              <CardContent className="p-8 space-y-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    Book This Tour
                  </h3>
                  <p className="text-muted-foreground">Secure your spot now</p>
                </div>

                {/* Guest Selector */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Number of Guests
                  </h4>

                  <div className="flex items-center justify-center gap-6 bg-gray-50 p-6 rounded-xl">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleDecrease}
                      disabled={guestCount === 1}
                      className="rounded-full h-12 w-12 text-lg shadow-sm hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-6 w-6" />
                    </Button>

                    <span className="text-3xl font-bold w-16 text-center text-gray-900">
                      {guestCount}
                    </span>

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleIncrease}
                      disabled={guestCount >= maxGuests}
                      className="rounded-full h-12 w-12 text-lg shadow-sm hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Maximum allowed:{" "}
                    <strong className="text-primary">{maxGuests}</strong> guests
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Pricing & CTA */}
                <div className="space-y-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg text-muted-foreground">
                      Per person
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      ৳{tour.costFrom?.toLocaleString() || "—"}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline text-xl font-bold">
                    <span>Total</span>
                    <span className="text-3xl md:text-4xl font-bold text-green-700">
                      ৳{totalAmount.toLocaleString()}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isBooking || !tour?._id}
                    onClick={handleBooking}
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Proceed to Payment"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useParams } from "react-router";
// import {
//   useGetAllToursQuery,
//   useGetTourByIdQuery,
// } from "@/redux/features/tour/tour.api";
// import {
//   Loader2,
//   MapPin,
//   DollarSign,
//   CalendarDays,
//   Users,
//   List,
//   CheckCircle,
//   XCircle,
//   Layers,
//   Minus,
//   Plus,
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useCreateBookingMutation } from "@/redux/features/booking/booking.api";

// export default function Booking() {
//   const { id } = useParams();

//   // Fetch tour by ID
//   const { data, isFetching } = useGetTourByIdQuery(id as string);
//   const tour = data;

//   const { data: tourData } = useGetAllToursQuery({ _id: id });
//   const [createBooking] = useCreateBookingMutation();

//   // ===============================
//   // ⭐ Guest Count State
//   // ===============================
//   const [guestCount, setGuestCount] = useState(1);

//   const handleIncrease = () => {
//     if (guestCount < (tour?.maxGuest || 1)) {
//       setGuestCount((prev) => prev + 1);
//     }
//   };

//   const handleDecrease = () => {
//     if (guestCount > 1) {
//       setGuestCount((prev) => prev - 1);
//     }
//   };

//   const handleBooking = async () => {
//     let bookingData;

//     if (tourData) {
//       bookingData = {
//         tour: id,
//         guestCount: guestCount,
//       };
//     }
//     console.log(bookingData);

//     try {
//       const res = await createBooking(bookingData).unwrap();
//       if (res.success) {
//         window.open(res.data.paymentUrl);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (isFetching) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <Loader2 className="w-10 h-10 animate-spin text-primary" />
//       </div>
//     );
//   }

//   if (!tour) {
//     return (
//       <Card className="p-10 text-center text-gray-500 shadow-sm mx-auto mt-10 max-w-lg">
//         Tour not found.
//       </Card>
//     );
//   }

//   return (
//     <div className="w-full max-w-5xl mx-auto px-4 py-10 space-y-8">
//       {/* ===== Banner Image ===== */}
//       <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
//         <img
//           src={tour?.images?.[0] || "/placeholder.jpg"}
//           alt={tour?.title}
//           className="w-full h-full object-cover"
//         />
//         {tour?.tourType?.name && (
//           <span className="absolute top-3 right-3 bg-primary text-white font-semibold text-sm px-3 py-1 rounded-full shadow-md">
//             {tour.tourType.name}
//           </span>
//         )}
//       </div>

//       {/* ===== Main Tour Info ===== */}
//       <Card className="shadow-md rounded-xl hover:shadow-xl transition-all">
//         <CardContent className="p-6 space-y-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             {tour?.title}
//           </h1>

//           {/* Dates & Price */}
//           <div className="flex flex-wrap justify-between gap-4 text-gray-700">
//             <div className="flex items-center gap-2">
//               <CalendarDays size={20} className="text-primary" />
//               <span className="font-medium">
//                 {new Date(tour?.startDate).toLocaleDateString()} -{" "}
//                 {new Date(tour?.endDate).toLocaleDateString()}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 font-semibold text-green-700">
//               <DollarSign size={20} className="text-primary" />
//               <span>Starts from ৳{tour?.costFrom || "N/A"}</span>
//             </div>
//           </div>

//           {/* Description */}
//           <p className="text-gray-600">{tour?.description}</p>

//           {/* Key Info Grid */}
//           <div className="grid sm:grid-cols-2 gap-6 mt-4">
//             <div className="flex items-center gap-2">
//               <MapPin className="text-primary" />
//               <span>
//                 <strong>Location:</strong> {tour?.location || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Users className="text-primary" />
//               <span>
//                 <strong>Guests:</strong> {tour?.maxGuest},{" "}
//                 <strong>Min Age:</strong> {tour?.minAge}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <Layers className="text-primary" />
//               <span>
//                 <strong>Division:</strong> {tour?.division?.name || "N/A"}
//               </span>
//             </div>
//             <div className="flex items-center gap-2">
//               <List className="text-primary" />
//               <span>
//                 <strong>Tour Type:</strong> {tour?.tourType?.name || "N/A"}
//               </span>
//             </div>
//           </div>

//           {/* Included / Excluded */}
//           <div className="grid sm:grid-cols-2 gap-6 mt-6">
//             <div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-700">
//                 <CheckCircle /> Included
//               </h3>
//               <ul className="list-disc list-inside text-gray-700">
//                 {tour?.included?.map((item: any, idx: any) => (
//                   <li key={idx}>{item}</li>
//                 )) || "N/A"}
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
//                 <XCircle /> Excluded
//               </h3>
//               <ul className="list-disc list-inside text-gray-700">
//                 {tour?.excluded?.map((item: any, idx: any) => (
//                   <li key={idx}>{item}</li>
//                 )) || "N/A"}
//               </ul>
//             </div>
//           </div>

//           {/* Amenities */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2 flex items-center gap-2 text-blue-600">
//               <Layers /> Amenities
//             </h3>
//             <p className="text-gray-700">
//               {tour?.amenities?.join(", ") || "N/A"}
//             </p>
//           </div>

//           {/* Tour Plan */}
//           <div className="mt-4">
//             <h3 className="font-semibold mb-2 flex items-center gap-2 text-purple-600">
//               <List /> Tour Plan
//             </h3>
//             <ol className="list-decimal list-inside text-gray-700 space-y-1">
//               {tour?.tourPlan?.map((plan: any, idx: any) => (
//                 <li key={idx}>{plan}</li>
//               )) || "N/A"}
//             </ol>
//           </div>

//           {/* =============================== */}
//           {/* ⭐ Guest Selector UI */}
//           {/* =============================== */}
//           <div className="mt-8">
//             <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//               <Users className="text-primary" /> Select Guests
//             </h3>

//             <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg w-max shadow-sm">
//               <Button
//                 size="icon"
//                 variant="outline"
//                 onClick={handleDecrease}
//                 disabled={guestCount === 1}
//                 className="rounded-full w-10 h-10"
//               >
//                 <Minus />
//               </Button>

//               <span className="text-xl font-semibold w-8 text-center">
//                 {guestCount}
//               </span>

//               <Button
//                 size="icon"
//                 variant="outline"
//                 onClick={handleIncrease}
//                 disabled={guestCount === tour?.maxGuest}
//                 className="rounded-full w-10 h-10"
//               >
//                 <Plus />
//               </Button>
//             </div>

//             <p className="text-gray-500 text-sm mt-1">
//               Max allowed: <strong>{tour?.maxGuest}</strong> guests
//             </p>

//             {/* ⭐ TOTAL AMOUNT */}
//             <div className="mt-4 bg-green-50 p-4 rounded-lg w-max shadow-sm border border-green-200">
//               <div className="flex items-center gap-2 text-green-800">
//                 <DollarSign className="text-green-600" />
//                 <span className="font-semibold text-lg">
//                   Total Amount: ৳{(tour?.costFrom || 0) * guestCount}
//                 </span>
//               </div>

//               <p className="text-xs text-gray-500">
//                 ({guestCount} × ৳{tour?.costFrom})
//               </p>
//             </div>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-wrap gap-4 mt-6">
//             <Button
//               onClick={handleBooking}
//               className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all"
//             >
//               Book Now
//             </Button>
//             <Button
//               variant="outline"
//               className="text-primary border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all"
//             >
//               Contact Us
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
