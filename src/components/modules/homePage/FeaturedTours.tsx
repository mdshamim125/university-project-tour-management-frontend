/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetAllToursQuery } from "@/redux/features/tour/tour.api";
import TourCard from "@/components/TourCard";
import { Link } from "react-router";
import TourCardSkeleton from "@/components/skeletons/TourCardSkeleton";

export default function FeaturedTours() {
  // Fetch first 6 tours only
  const { data, isFetching } = useGetAllToursQuery({
    page: "1",
    limit: "6",
  });

  const tours = data?.data || [];

  return (
    <section className="mx-auto md:px-16 px-8 md:py-10 py-6">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-3">Popular Tours</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover the most exciting and trending tours handpicked for you.
        </p>
      </div>

      {/* Tours Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[30vh]">
        {isFetching ? (
          Array.from({ length: 6 }).map((_, index) => (
            <TourCardSkeleton key={index} />
          ))
        ) : tours.length > 0 ? (
          tours.map((tour: any) => <TourCard key={tour._id} tour={tour} />)
        ) : (
          <Card className="p-10 text-center text-gray-500 shadow-sm col-span-full">
            No tours found.
          </Card>
        )}
      </div>

      {/* See All Button */}
      <div className="text-center mt-6">
        <Link to="/tours">
          <Button className="text-lg">See All Tours</Button>
        </Link>
      </div>
    </section>
  );
}
