/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router"; // adjust if using different router
import DivisionCardSkeleton from "@/components/skeletons/DivisionCardSkeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DivisionSection() {
  const { data, isFetching } = useGetDivisionsQuery({});
  const divisions = data?.data?.slice(0, 9) || [];

  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || isFetching || divisions.length === 0) return;

    gsap.killTweensOf(".division-card");

    gsap.fromTo(
      ".division-card",
      {
        opacity: 0,
        y: 50,
        scale: 0.96,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: {
          amount: 0.6, // total stagger duration
          from: "start",
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [divisions, isFetching]);

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Explore Bangladesh by Division
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Journey through the diverse landscapes, cultures, and adventures of
            Bangladesh's eight divisions. Find your next unforgettable tour.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8"
        >
          {isFetching ? (
            Array.from({ length: 8 }).map((_, i) => (
              <DivisionCardSkeleton key={i} />
            ))
          ) : divisions.length > 0 ? (
            divisions.map((division: any) => (
              <Link
                key={division._id}
                to={`/tours?division=${division._id}`}
                className="group block h-full"
              >
                <Card
                  className="
                    division-card
                    relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800
                    shadow-md hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700
                    transition-all duration-500 ease-out
                    bg-white dark:bg-gray-900
                    h-full flex flex-col
                  "
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={
                        division.thumbnail || "/images/placeholder-division.jpg"
                      }
                      alt={`${division.name} landscape`}
                      className="
                        absolute inset-0 w-full h-full object-cover 
                        transition-transform duration-700 ease-out
                        group-hover:scale-110
                      "
                      loading="lazy"
                    />

                    {/* Stronger, elegant overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Text overlay with slide-up effect */}
                    <div
                      className="
                        absolute inset-0 flex flex-col justify-end p-6
                        text-white
                      "
                    >
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <MapPin className="w-5 h-5 text-white" />
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight drop-shadow-md">
                          {division.name}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-gray-200 font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                        Discover tours →
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No divisions available right now. Please check back soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
// import { Card } from "@/components/ui/card";
// import { MapPin } from "lucide-react";
// import { Link } from "react-router";
// import DivisionCardSkeleton from "@/components/skeletons/DivisionCardSkeleton";

// export default function DivisionSection() {
//   const { data, isFetching } = useGetDivisionsQuery({});
//   const divisions = data?.data?.slice(0, 9) || [];

//   return (
//     <section className="bg-gray-50 dark:bg-gray-900 md:px-16 px-8 md:py-10 py-6">
//       <div className="mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
//             Explore by Division
//           </h2>
//           <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//             Discover breathtaking destinations across all divisions of
//             Bangladesh. Choose a division to find exciting tour packages.
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 min-h-[300px]">
//           {isFetching ? (
//             Array.from({ length: 6 }).map((_, index) => (
//               <DivisionCardSkeleton key={index} />
//             ))
//           ) : divisions.length > 0 ? (
//             divisions.map((division: any) => (
//               <Link
//                 key={division._id}
//                 to={`/tours?division=${division._id}`}
//                 className="group block"
//               >
//                 <Card className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
//                   {/* Image */}
//                   <div className="relative h-56 w-full overflow-hidden">
//                     <img
//                       src={division.thumbnail || "/placeholder.jpg"}
//                       alt={division.name}
//                       className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       loading="lazy"
//                     />

//                     {/* Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//                     {/* Text */}
//                     <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2">
//                       <MapPin className="w-5 h-5 text-white opacity-90" />
//                       <div>
//                         <h3 className="text-xl font-semibold text-white">
//                           {division.name}
//                         </h3>
//                         <p className="text-sm text-gray-200">View tours →</p>
//                       </div>
//                     </div>
//                   </div>
//                 </Card>
//               </Link>
//             ))
//           ) : (
//             <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
//               No divisions available at the moment.
//             </p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
