// frontend/pages/index.tsx
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
    propertyType?: string;
    bedrooms?: string;
    priceMin?: string;
    priceMax?: string;
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
    propertyType?: string;
    bedrooms?: string;
    priceMin?: string;
    priceMax?: string;
  }) => {
    loadApartments(params);
  };

  const featuredApartments = apartments.filter((apt) => apt.featured);

  return (
    <Layout title="Home | Apartment Finder">
      <div className="relative">
        <section className="relative h-[400px] md:h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-image.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
          </div>

          <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center leading-tight">
              YOUR HOME IN A COMPOUND
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-center max-w-3xl">
              Search And Compare Among 15000+ Properties And 800+ Prime
              Compounds
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="relative -mt-24 z-20 max-w-5xl mx-auto">
            <SearchFilter onSearch={handleSearch} />
          </div>
        </div>

        <div className="bg-gray-50 pt-32 pb-16">
          <div className="container mx-auto px-4">
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
                    <h2 className="text-2xl font-bold mb-6">
                      Featured Apartments
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {featuredApartments.map((apartment) => (
                        <ApartmentCard
                          key={apartment.id}
                          apartment={apartment}
                        />
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
                        <ApartmentCard
                          key={apartment.id}
                          apartment={apartment}
                        />
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
