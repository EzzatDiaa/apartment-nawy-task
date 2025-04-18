// frontend/components/Layout.tsx
import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Apartment Listings",
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find your perfect apartment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white text-gray-800 shadow-sm">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer flex items-center">
              <span className="text-blue-600">Apartment</span>
              <span>Finder</span>
            </div>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <Link href="/apartments" className="hover:text-blue-600">
              Search
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Sell
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Blog
            </Link>
            <Link href="#" className="hover:text-blue-600">
              About
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Contact
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Now
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Careers
            </Link>
            <Link href="#" className="hover:text-blue-600">
              Verify Agent
            </Link>
            <button className="ml-4 p-2 rounded-full border border-gray-300">
              <FaHeart className="text-gray-500" />
            </button>
            <Link href="#" className="ml-2 hover:text-blue-600">
              العربية
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-800">
              {/* Menu icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-center md:text-left">
                &copy; {new Date().getFullYear()} ApartmentFinder. All rights
                reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-blue-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-blue-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
