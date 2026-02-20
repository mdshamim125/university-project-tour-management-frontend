/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
// import TourCard from "@/components/TourCard";
// import { Link } from "react-router";
// import TourCardSkeleton from "@/components/skeletons/TourCardSkeleton";

// export default function FeaturedTours() {
//   // Fetch first 6 tours only
//   const { data, isFetching } = useGetAllToursQuery({
//     page: "1",
//     limit: "6",
//   });

//   const tours = data?.data || [];

//   return (
//     <section className="mx-auto md:px-16 px-8 md:py-10 py-6">
//       {/* Section Title */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-semibold mb-3">Popular Tours</h2>
//         <p className="text-gray-500 max-w-2xl mx-auto">
//           Discover the most exciting and trending tours handpicked for you.
//         </p>
//       </div>

//       {/* Tours Grid */}
//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[30vh]">
//         {isFetching ? (
//           Array.from({ length: 6 }).map((_, index) => (
//             <TourCardSkeleton key={index} />
//           ))
//         ) : tours.length > 0 ? (
//           tours.map((tour: any) => <TourCard key={tour._id} tour={tour} />)
//         ) : (
//           <Card className="p-10 text-center text-gray-500 shadow-sm col-span-full">
//             No tours found.
//           </Card>
//         )}
//       </div>

//       {/* See All Button */}
//       <div className="text-center mt-6">
//         <Link to="/tours">
//           <Button className="text-lg">See All Tours</Button>
//         </Link>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import TourCard from "@/components/TourCard";
import { Link } from "react-router";
import TourCardSkeleton from "@/components/skeletons/TourCardSkeleton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedTours() {
  const { data, isFetching } = useGetAllToursQuery({
    page: "1",
    limit: "6",
  });

  const tours = data?.data || [];

  // Ref for the grid container
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current || isFetching || tours.length === 0) return;

    // Reset any previous animations (good practice in React)
    gsap.killTweensOf(".tour-card");

    // Create stagger animation for cards
    gsap.fromTo(
      ".tour-card",
      {
        opacity: 0,
        y: 60, // start 60px below
        scale: 0.92, // slightly smaller
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: {
          amount: 0.45, // total stagger time across all cards
          from: "start", // left-to-right, top-to-bottom feel
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 82%", // start when top of grid is 82% from viewport top
          toggleActions: "play none none reverse", // play once, reverse on scroll up
          // markers: true,      // ← uncomment during dev to debug
        },
      },
    );

    // Cleanup on unmount / re-run
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [tours, isFetching]);

  return (
    <section className="mx-auto md:px-16 px-8 md:py-12 py-8">
      {/* Section Title with subtle entrance */}
      <div className="text-center mb-10 md:mb-14">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-gray-900">
          Popular Tours
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover the most exciting and trending tours handpicked for you.
        </p>
      </div>

      {/* Tours Grid */}
      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[40vh]"
      >
        {isFetching ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TourCardSkeleton key={index} />
          ))
        ) : tours.length > 0 ? (
          tours.map((tour: any) => (
            <div key={tour._id} className="tour-card">
              <TourCard tour={tour} />
            </div>
          ))
        ) : (
          <Card className="p-10 text-center text-gray-600 shadow-md col-span-full border border-gray-200">
            No tours found at the moment.
          </Card>
        )}
      </div>

      {/* See All Button – subtle scale on hover */}
      <div className="text-center mt-10 md:mt-14">
        <Link to="/tours">
          <Button
            className="
              text-lg px-8 py-6 
              transition-all duration-300 
              hover:scale-105 hover:shadow-lg
              active:scale-95
            "
          >
            Explore All Tours
          </Button>
        </Link>
      </div>
    </section>
  );
}
