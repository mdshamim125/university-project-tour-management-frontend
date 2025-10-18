import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-10">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="text-start">
              <Logo />
            </div>
            {/* Optional short description (can be uncommented if needed) */}
            {/* <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Tour Management — Explore, book, and create unforgettable journeys with ease.
            </p> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 uppercase dark:text-white font-semibold mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  All Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-gray-800 uppercase dark:text-white font-semibold mb-2">
              Explore
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/destinations"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-800 uppercase dark:text-white font-semibold mb-2">
              Resources
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 uppercase dark:text-white font-semibold mb-2">
              Contact Us
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                +880 1710 534 833
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                support@tourmanagement.com
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Rangpur, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="h-px my-8 bg-gray-200 border-none dark:bg-gray-700" />

        {/* Copyright & Social */}
        <div>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tour Management — All rights reserved.
          </p>

          {/* <div className="flex gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors text-lg"
            >
              <i className="ri-facebook-fill"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors text-lg"
            >
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors text-lg"
            >
              <i className="ri-twitter-x-line"></i>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
