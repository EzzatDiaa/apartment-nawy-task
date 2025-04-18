// frontend/pages/index.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ApartmentCard from "../components/ApartmentCard";
import { fetchApartments } from "../services/api";
import { Apartment } from "../types/apartment";
import { FaSearch, FaChevronDown } from "react-icons/fa";

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"compounds" | "properties">(
    "compounds",
  );
  const router = useRouter();

  const loadApartments = async (params?: {
    search?: string;
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }) => {
    try {
      setLoading(true);
      const data = await fetchApartments(params);
      setApartments(data);
      setError(null);
    } catch (err) {
      console.error("Error loading apartments:", err);
      setError("Failed to load apartments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApartments();
  }, []);

  const handleSearch = () => {
    router.push("/apartments");
  };

  const featuredApartments = apartments.filter((apt) => apt.featured);

  return (
    <Layout title="Home | Apartment Finder">
      <section className="relative h-[500px]">
        {/* Hero background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-image.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Hero content */}
        <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            YOUR HOME IN A COMPOUND
          </h1>
          <p className="text-xl mb-12 text-center">
            Search And Compare Among 15000+ Properties And 800+ Prime Compounds
          </p>

          {/* Search component */}
          <div className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg">
            {/* Tabs */}
            <div className="flex text-gray-800">
              <button
                className={`flex-1 py-4 text-center font-medium ${activeTab === "compounds" ? "border-b-2 border-blue-600" : ""}`}
                onClick={() => setActiveTab("compounds")}
              >
                Compounds
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium ${activeTab === "properties" ? "border-b-2 border-blue-600" : ""}`}
                onClick={() => setActiveTab("properties")}
              >
                Properties
              </button>
            </div>

            {/* Search inputs */}
            <div className="p-4">
              <div className="w-full mb-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Area, Compound, Real Estate Developer"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <select className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Property Types</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                  <select className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Beds and Baths</option>
                    <option>1+ Bed</option>
                    <option>2+ Beds</option>
                    <option>3+ Beds</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                <div className="relative">
                  <select className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Price Range</option>
                    <option>$500 - $1000</option>
                    <option>$1000 - $2000</option>
                    <option>$2000+</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {featuredApartments.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Apartments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredApartments.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="text-2xl font-bold mb-6">All Apartments</h2>
              {apartments.length === 0 ? (
                <div className="text-center p-8 bg-gray-100 rounded-lg">
                  <p className="text-gray-600">
                    No apartments found. Try a different search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {apartments.map((apartment) => (
                    <ApartmentCard key={apartment.id} apartment={apartment} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
