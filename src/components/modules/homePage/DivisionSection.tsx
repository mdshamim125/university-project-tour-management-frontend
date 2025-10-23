/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link } from "react-router";
export default function DivisionSection() {
  const { data, isFetching } = useGetDivisionsQuery({});
  const divisions = data?.data?.slice(0, 9) || [];

  return (
    <section className="py-12 md:px-12 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Explore by Division
        </h2>
        <p className="text-gray-500 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
          Discover breathtaking destinations across all divisions of Bangladesh.
          Choose a division to find exciting tour packages.
        </p>

        {/* Division Grid */}
        {isFetching ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : divisions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {divisions.map((division: any) => (
              <Link
                key={division._id}
                to={`/tours?division=${division._id}`}
                className="group"
              >
                <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {/* Image */}
                  <div className="relative w-full h-48">
                    <img
                      src={division.thumbnail || "/placeholder.jpg"}
                      alt={division.name}
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0  transition-colors" />
                    <div className="absolute bottom-4 left-4 text-left">
                      <h3 className="text-white text-lg font-semibold drop-shadow-md">
                        {division.name}
                      </h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No divisions available.
          </p>
        )}
      </div>
    </section>
  );
}
