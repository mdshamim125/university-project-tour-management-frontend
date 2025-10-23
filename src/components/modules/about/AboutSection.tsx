import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import FAQSection from "./FAQSection";

export default function AboutSection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            About Our Tour Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We’re passionate about making your travel dreams a reality. Our
            platform connects explorers with carefully crafted tour experiences
            across Bangladesh — from the serene tea gardens of Sylhet to the
            majestic Sundarbans of Khulna.
          </p>
        </motion.div>

        {/* Mission, Vision, and Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "To create seamless, personalized, and affordable travel experiences that inspire people to explore Bangladesh’s rich beauty and culture.",
              icon: "🌏",
            },
            {
              title: "Our Vision",
              desc: "To be Bangladesh’s leading tour management platform — connecting travelers with authentic adventures, sustainability, and trust.",
              icon: "🚀",
            },
            {
              title: "Our Values",
              desc: "We believe in transparency, quality service, and responsible tourism. Every trip we organize is built on care, honesty, and comfort.",
              icon: "💎",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-md hover:shadow-xl transition rounded-2xl border-none">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <FAQSection />
        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Ready to start your next adventure?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Let us help you explore Bangladesh’s wonders — one journey at a
            time.
          </p>
          <Link to="/tours">
            <Button
              size="lg"
              className="bg-primary hover:bg-blue-700 text-white font-semibold"
            >
              Explore Tours
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
