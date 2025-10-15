import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="container p-6 mx-auto">
        <div className="">
          {/* Footer Links */}
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-between items-center gap-8">
              {/* Quick Links */}
              <div className="text-start">
                <Logo />
              </div>

              {/* <p className="">
                  Tour Management — Explore, book, and create unforgettable
                  journeys with ease.
                </p> */}

              <div>
                <h3 className="text-gray-700  uppercase dark:text-white font-semibold">
                  Quick Links
                </h3>
                <Link
                  to="/"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Home
                </Link>
                <Link
                  to="/tours"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  All Tours
                </Link>
                <Link
                  to="/blogs"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Blogs
                </Link>
                <Link
                  to="/contact"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Contact
                </Link>
              </div>

              {/* Explore */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Explore
                </h3>
                <Link
                  to="/destinations"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Destinations
                </Link>
                <Link
                  to="/packages"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Tour Packages
                </Link>
                <Link
                  to="/gallery"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Gallery
                </Link>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Resources
                </h3>
                <Link
                  to="/faq"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  FAQ
                </Link>
                <Link
                  to="/terms"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Contact Us
                </h3>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  +880 1710 534 833
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  support@tourmanagement.com
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Rangpur, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tour Management — All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <i className="ri-facebook-fill text-lg"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <i className="ri-instagram-line text-lg"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              <i className="ri-twitter-x-line text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
