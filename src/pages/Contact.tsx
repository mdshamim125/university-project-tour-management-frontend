import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="mx-auto  md:px-16 px-8 md:py-10 py-6 bg-gray-50 dark:bg-gray-900">
      <div className="">
        {/* Heading */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Get in Touch
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Have questions or want to plan your next tour? We’d love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <form className="space-y-5">
                <div>
                  <label className="text-gray-700 dark:text-gray-200 font-medium">Name</label>
                  <Input placeholder="Your Name" className="mt-1" />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200 font-medium">Email</label>
                  <Input type="email" placeholder="you@example.com" className="mt-1" />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200 font-medium">Message</label>
                  <Textarea
                    placeholder="Write your message..."
                    className="mt-1 min-h-[120px]"
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-blue-700 text-white">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Reach out to us via email, phone, or visit our office. We’re always happy to help.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <p className="text-gray-700 dark:text-gray-200">cse12005038brur@gmail.com</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-blue-600" />
              <p className="text-gray-700 dark:text-gray-200">+880 1710534833</p>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="text-blue-600" />
              <p className="text-gray-700 dark:text-gray-200">
                Dhaka, Bangladesh
              </p>
            </div>

            {/* Google Map Embed */}
            <div className="rounded-lg overflow-hidden shadow-md border">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.709694197476!2d90.37456887475605!3d23.790889587243493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7089b68e4d9%3A0x6cf19e65c8f89b7!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1708183208753!5m2!1sen!2sbd"
                width="100%"
                height="250"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
