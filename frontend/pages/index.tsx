import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ApartmentCard from "../components/ApartmentCard";
import SearchFilter from "../components/SearchFilter";
import { fetchApartments } from "../services/api";
import { Apartment } from "../types/apartment";

export default function Home() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const handleSearch = (params: {
    search?: string;
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }) => {
    loadApartments(params);
  };

  const featuredApartments = apartments.filter((apt) => apt.featured);

  return (
    <Layout title="Home | Apartment Finder">
      <section className="relative bg-blue-600 text-white py-16 rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Apartment
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Browse through our curated selection of premium apartments and find
            your next home.
          </p>
          <SearchFilter onSearch={handleSearch} />
        </div>
      </section>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

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
    </Layout>
  );
}
