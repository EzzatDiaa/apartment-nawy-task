import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = "Apartment Listings",
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Find your perfect apartment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white text-gray-800 shadow-sm sticky top-0 z-50">
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
            <Link href="/search" className="hover:text-blue-600">
              Search
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              Sell
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              Blog
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              About
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              Contact
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              Now
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              Careers
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <Link
              href="/coming-soon"
              className="hover:text-blue-600 flex items-center"
            >
              Verify Agent
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
            <button className="ml-4 p-2 rounded-full border border-gray-300">
              <FaHeart className="text-gray-500" />
            </button>
            <Link
              href="/coming-soon"
              className="ml-2 hover:text-blue-600 flex items-center"
            >
              العربية
              <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                soon
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-800 p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-md">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="py-2 hover:text-blue-600">
                Home
              </Link>
              <Link href="/search" className="py-2 hover:text-blue-600">
                Search
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                Sell
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                Blog
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                About
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                Contact
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                Now
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                Careers
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                Verify Agent
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="py-2 hover:text-blue-600 flex items-center"
              >
                العربية
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
            </div>
          </div>
        )}
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
              <Link
                href="/coming-soon"
                className="hover:text-blue-300 flex items-center"
              >
                Privacy Policy
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="hover:text-blue-300 flex items-center"
              >
                Terms of Service
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
              <Link
                href="/coming-soon"
                className="hover:text-blue-300 flex items-center"
              >
                Contact Us
                <span className="ml-1 bg-orange-500 text-white text-[9px] px-1 rounded-sm">
                  soon
                </span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
