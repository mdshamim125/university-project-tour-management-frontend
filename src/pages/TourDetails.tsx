// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Link, useNavigate, useParams } from "react-router";
// import { useGetTourByIdQuery } from "@/redux/features/tour/tour.api";
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
// } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function TourDetails() {
//   const { id } = useParams();

//   // Fetch tour by ID
//   const { data, isFetching } = useGetTourByIdQuery(id as string);
//   const navigate = useNavigate();
//   const tour = data;

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

//           {/* Buttons */}
//           <div className="flex flex-wrap gap-4 mt-6">
//             <Button className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all">
//               <Link to={`/booking/${tour._id}`}>Book Now</Link>
//             </Button>
//             <Button
//               variant="outline"
//               className="text-primary border-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg transition-all"
//               onClick={() => navigate("/contact")}
//             >
//               Contact Us
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useGetTourByIdQuery } from "@/redux/features/tour/tour.api";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function TourDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: tour, isFetching, isError } = useGetTourByIdQuery(id as string);

  // Carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = tour?.images?.length ? tour.images : ["/placeholder-tour.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (isError || !tour) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-md text-center p-10 shadow-lg">
          <CardContent>
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Tour Not Found
            </h2>
            <p className="text-muted-foreground mb-6">
              The tour you're looking for might have been removed or is
              temporarily unavailable.
            </p>
            <Button asChild>
              <Link to="/tours">Back to All Tours</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section with Image Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10">
          <div className="relative aspect-[16/9] md:aspect-[21/9] bg-gray-200">
            <img
              src={images[currentImageIndex]}
              alt={`${tour.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((idx: any) => (
                    <button
                      key={idx}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all",
                        idx === currentImageIndex
                          ? "bg-white scale-125"
                          : "bg-white/50 hover:bg-white/80",
                      )}
                      onClick={() => setCurrentImageIndex(idx)}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Tour Type Badge */}
            {tour.tourType?.name && (
              <Badge className="absolute top-6 right-6 bg-primary/90 hover:bg-primary text-white text-base px-4 py-1.5 shadow-lg">
                {tour.tourType.name}
              </Badge>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {tour.title}
                </h1>

                {/* Quick Info */}
                <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
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
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <DollarSign className="h-5 w-5" />
                    <span>
                      Starts from ৳{tour.costFrom?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Description */}
                <div className="prose max-w-none mb-10">
                  <h2 className="text-2xl font-semibold mb-4">Tour Overview</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {tour.description || "No description available."}
                  </p>
                </div>

                {/* Included / Excluded */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 text-green-700">
                      <CheckCircle className="h-6 w-6" /> What's Included
                    </h3>
                    <ul className="space-y-2">
                      {tour.included?.length ? (
                        tour.included.map((item: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No inclusions listed</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 text-red-600">
                      <XCircle className="h-6 w-6" /> What's Excluded
                    </h3>
                    <ul className="space-y-2">
                      {tour.excluded?.length ? (
                        tour.excluded.map((item: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">No exclusions listed</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Amenities */}
                {tour.amenities?.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-xl font-semibold flex items-center gap-2 mb-4 text-blue-700">
                      <Layers className="h-6 w-6" /> Amenities & Facilities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tour.amenities.map((amenity: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-4 py-1.5 text-sm bg-blue-50 text-blue-800 hover:bg-blue-100"
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tour Plan */}
            {tour.tourPlan?.length > 0 && (
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
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

          {/* Right Column - Booking & Quick Info */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:h-fit">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Booking Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <CalendarDays className="mx-auto h-6 w-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">
                        {tour.startDate && tour.endDate
                          ? `${Math.ceil(
                              (new Date(tour.endDate).getTime() -
                                new Date(tour.startDate).getTime()) /
                                (1000 * 60 * 60 * 24),
                            )} Days`
                          : "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Users className="mx-auto h-6 w-6 text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Group Size
                      </p>
                      <p className="font-semibold">
                        Up to {tour.maxGuest || "N/A"} guests
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium">Starting from</span>
                    <span className="text-2xl font-bold text-green-700">
                      ৳{tour.costFrom?.toLocaleString() || "N/A"}
                    </span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    <Link to={`/booking/${tour._id}`}>Book Now</Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-12 text-lg"
                    onClick={() => navigate("/contact")}
                  >
                    Contact for Custom Tour
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow">
                <CardContent className="p-6 text-center">
                  <MapPin className="mx-auto h-8 w-8 text-blue-600 mb-3" />
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {tour.location || "N/A"}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow">
                <CardContent className="p-6 text-center">
                  <Layers className="mx-auto h-8 w-8 text-purple-600 mb-3" />
                  <h4 className="font-semibold">Division</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {tour.division?.name || "N/A"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
