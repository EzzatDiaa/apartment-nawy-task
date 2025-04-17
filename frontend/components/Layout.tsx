import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

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

      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <div className="text-2xl font-bold cursor-pointer">
              ApartmentFinder
            </div>
          </Link>
          <div className="space-x-4">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <Link href="/apartments" className="hover:text-blue-200">
              Apartments
            </Link>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">{children}</main>

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
