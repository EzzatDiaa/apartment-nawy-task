import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { FaArrowLeft, FaHome, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const ComingSoon = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);

      if (distance < 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! We'll notify ${email} when we launch.`);
    setEmail("");
  };

  return (
    <>
      <Head>
        <title>Coming Soon | Apartment Finder</title>
        <meta name="description" content="Our new feature is coming soon!" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
        <header className="w-full p-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <FaArrowLeft className="mr-2 text-blue-600" />
            <span className="text-blue-600 font-medium">Back to Home</span>
          </Link>
          <div className="text-xl font-bold">
            <span className="text-blue-600">Apartment</span>
            <span className="text-gray-800">Finder</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-4xl w-full px-4 py-16 bg-white rounded-2xl shadow-xl">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 tracking-tight">
                We're Building Something Amazing!
              </h1>
              <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
                Our team is working hard to bring you this exciting new feature.
                We'll be launching soon with enhanced property listings and
                search capabilities.
              </p>
            </div>

            {/* Countdown */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              <div className="w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg">
                <span className="text-2xl md:text-3xl font-bold">{days}</span>
                <span className="text-xs uppercase tracking-wide">Days</span>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg">
                <span className="text-2xl md:text-3xl font-bold">{hours}</span>
                <span className="text-xs uppercase tracking-wide">Hours</span>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg">
                <span className="text-2xl md:text-3xl font-bold">
                  {minutes}
                </span>
                <span className="text-xs uppercase tracking-wide">Minutes</span>
              </div>
              <div className="w-20 h-20 md:w-24 md:h-24 flex flex-col items-center justify-center bg-blue-600 text-white rounded-lg shadow-lg">
                <span className="text-2xl md:text-3xl font-bold">
                  {seconds}
                </span>
                <span className="text-xs uppercase tracking-wide">Seconds</span>
              </div>
            </div>

            <div className="max-w-md mx-auto mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Get Notified When We Launch
              </h3>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row gap-2"
              >
                <div className="flex-grow relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                >
                  Notify Me
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  <FaHome className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Enhanced Listings
                </h3>
                <p className="text-center text-gray-600">
                  More detailed property information with high-quality images
                  and virtual tours.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  <FaCalendarAlt className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Booking</h3>
                <p className="text-center text-gray-600">
                  Schedule property viewings directly through our platform with
                  real-time availability.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-blue-50 rounded-lg">
                <div className="p-3 bg-blue-100 rounded-full mb-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Map Integration</h3>
                <p className="text-center text-gray-600">
                  Explore properties with interactive maps showing nearby
                  amenities and services.
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full p-6 bg-white text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} ApartmentFinder. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default ComingSoon;
