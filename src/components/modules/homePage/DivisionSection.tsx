/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { Card } from "@/components/ui/card";
import { Loader2, MapPin } from "lucide-react";
import { Link } from "react-router";

export default function DivisionSection() {
  const { data, isFetching } = useGetDivisionsQuery({});
  const divisions = data?.data?.slice(0, 9) || [];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 md:px-16 px-8 md:py-10 py-6">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Explore by Division
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover breathtaking destinations across all divisions of
            Bangladesh. Choose a division to find exciting tour packages.
          </p>
        </div>

        {/* Loader */}
        {isFetching ? (
          <div className="flex justify-center items-center h-52">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : divisions.length > 0 ? (
          /* Division Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {divisions.map((division: any) => (
              <Link
                key={division._id}
                to={`/tours?division=${division._id}`}
                className="group block"
              >
                <Card className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={division.thumbnail || "/placeholder.jpg"}
                      alt={division.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                    {/* Text */}
                    <div className="absolute bottom-5 left-5 right-5 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-white opacity-90" />
                      <div>
                        <h3 className="text-xl font-semibold text-white tracking-wide">
                          {division.name}
                        </h3>
                        <p className="text-sm text-gray-200 opacity-90">
                          View tours →
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No divisions available at the moment.
          </p>
        )}
      </div>
    </section>
  );
}
