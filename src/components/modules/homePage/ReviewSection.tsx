import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
  //   {
  //     name: "Farhana Akter",
  //     location: "Sylhet, Bangladesh",
  //     image: "https://i.ibb.co/pdw2XkY/user4.jpg",
  //     rating: 5,
  //     review:
  //       "Superb experience! I joined the Barishal Riverside Tour — the floating market was a highlight. Everything was smooth and well-managed.",
  //     tourName: "Barishal Riverside Tour",
  //     date: "2025-10-02",
  //   },
  //   {
  //     name: "Tanvir Alam",
  //     location: "Rangpur, Bangladesh",
  //     image: "https://i.ibb.co/TtKczHF/user5.jpg",
  //     rating: 4.7,
  //     review:
  //       "Great hospitality and excellent communication throughout the tour. The Rangpur Historical Exploration was both educational and enjoyable.",
  //     tourName: "Rangpur Historical Exploration",
  //     date: "2025-09-22",
  //   },
];

export default function ReviewSection() {
  return (
    <section className="mx-auto md:px-16 px-8 md:py-10 py-6 bg-gray-50 dark:bg-gray-900">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Real travelers. Real experiences. Real satisfaction.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <CardContent className="p-6">
                {/* Profile */}
                <div className="flex items-center mb-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                      {review.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {review.location}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  “{review.review}”
                </p>

                {/* Tour Info */}
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-600 dark:text-gray-400">
                    {review.tourName}
                  </span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span>{review.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
