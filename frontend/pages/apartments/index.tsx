import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import ApartmentCard from "../../components/ApartmentCard";
import SearchFilter from "../../components/SearchFilter";
import { fetchApartments } from "../../services/api";
import { Apartment } from "../../types/apartment";

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <Layout title="Apartment Listings">
      <h1 className="text-3xl font-bold mb-6">All Apartments</h1>

      <SearchFilter onSearch={handleSearch} />

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : apartments.length === 0 ? (
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
    </Layout>
  );
}
