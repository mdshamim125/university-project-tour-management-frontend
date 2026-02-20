import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Review {
  name: string;
  location: string;
  image: string;
  rating: number;
  review: string;
  tourName: string;
  date: string;
}

const reviews: Review[] = [
  {
    name: "Ayesha Rahman",
    location: "Dhaka, Bangladesh",
    image: "https://i.ibb.co/5vChb5B/user1.jpg",
    rating: 5,
    review:
      "The Dhaka Historical Tour was absolutely amazing! Everything was perfectly organized — from hotel booking to local guides. I’ll definitely book again!",
    tourName: "Dhaka Historical Landmarks Tour",
    date: "2025-08-15",
  },
  {
    name: "Kamal Uddin",
    location: "Chattogram, Bangladesh",
    image: "https://i.ibb.co/zVPLbqJ/user2.jpg",
    rating: 4.5,
    review:
      "The Sundarbans trip from Khulna was unforgettable! The guides were professional and the arrangements were top-notch. A must for nature lovers!",
    tourName: "Khulna Sundarbans Adventure",
    date: "2025-07-28",
  },
  {
    name: "Rifat Hasan",
    location: "Rajshahi, Bangladesh",
    image: "https://i.ibb.co/Jt9wMZQ/user3.jpg",
    rating: 4.8,
    review:
      "I loved the Rajshahi Mango & Silk Tour. The guides were friendly, the transport was comfortable, and the food was delicious!",
    tourName: "Rajshahi Mango & Silk Tour",
    date: "2025-09-12",
  },
  // Add more when ready...
];

export default function ReviewSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      ".review-card",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: { amount: 0.4 },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-5 h-5 fill-yellow-500 text-yellow-500"
          />
        ))}
        {hasHalf && (
          <Star className="w-5 h-5 fill-yellow-500/50 text-yellow-500" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300 dark:text-gray-600"
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Authentic experiences from real guests who explored Bangladesh with
            us.
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="
                review-card
                overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800
                bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl
                transition-all duration-300 hover:-translate-y-1
                flex flex-col h-full
              "
            >
              <CardContent className="p-6 md:p-7 flex flex-col flex-1">
                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative flex-shrink-0">
                    <img
                      src={review.image}
                      alt={`${review.name} - traveler`}
                      className="w-14 h-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800 shadow-sm"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Stars */}
                <div className="mb-4">{renderStars(review.rating)}</div>

                {/* Review Text */}
                <blockquote className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                  “{review.review}”
                </blockquote>

                {/* Tour & Date Footer */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-2">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {review.tourName}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatDate(review.date)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Optional: See more link or carousel indicator if you expand */}
        {reviews.length < 6 && (
          <div className="text-center mt-10">
            <p className="text-gray-500 dark:text-gray-400">
              More traveler stories coming soon...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
