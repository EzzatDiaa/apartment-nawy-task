import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../../components/Layout";
import { fetchApartmentById } from "../../services/api";
import { Apartment } from "../../types/apartment";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMap,
  FaArrowLeft,
} from "react-icons/fa";

export default function ApartmentDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  
  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          setLoading(true);
          const data = await fetchApartmentById(Number(id));
          setApartment(data);
          setError(null);
        } catch (err) {
          console.error("Error loading apartment details:", err);
          setError("Failed to load apartment details. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchApartment();
    }
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Layout title="Loading...">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !apartment) {
    return (
      <Layout title="Error">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error || "Apartment not found"}</p>
        </div>
        <button
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800"
          onClick={handleGoBack}
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </Layout>
    );
  }

  const defaultImage = "/default-apartment.jpg";
  const images =
    apartment.images && apartment.images.length > 0
      ? apartment.images
      : [defaultImage];

  return (
    <Layout title={`${apartment.unitName} | Apartment Details`}>
      <button
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        onClick={handleGoBack}
      >
        <FaArrowLeft className="mr-2" /> Back to listings
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${images[activeImageIndex]})` }}
              />
              {apartment.featured && (
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Featured
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="p-4 flex gap-2 overflow-x-auto">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded ${
                      index === activeImageIndex
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <div
                      className="h-full w-full bg-cover bg-center rounded"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {apartment.description}
            </p>
          </div>

          {apartment.amenities && apartment.amenities.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {apartment.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h1 className="text-3xl font-bold mb-2">{apartment.unitName}</h1>
            <p className="text-gray-600 mb-4">{`${apartment.unitNumber}, ${apartment.project}`}</p>

            <div className="flex items-center justify-between mb-6 border-b pb-6">
              <span className="text-3xl font-bold text-blue-600">
                ${apartment.price.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="flex justify-center mb-2">
                  <FaBed className="text-blue-500 text-xl" />
                </div>
                <div className="text-sm text-gray-500">Bedrooms</div>
                <div className="font-bold">{apartment.bedrooms}</div>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="flex justify-center mb-2">
                  <FaBath className="text-blue-500 text-xl" />
                </div>
                <div className="text-sm text-gray-500">Bathrooms</div>
                <div className="font-bold">{apartment.bathrooms}</div>
              </div>
              <div className="text-center p-3 bg-gray-100 rounded-lg">
                <div className="flex justify-center mb-2">
                  <FaRulerCombined className="text-blue-500 text-xl" />
                </div>
                <div className="text-sm text-gray-500">Area</div>
                <div className="font-bold">{apartment.area} m²</div>
              </div>
            </div>

            {apartment.location && (
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <FaMap className="text-blue-500 mr-2" />
                  <h3 className="font-bold">Location</h3>
                </div>
                <p className="text-gray-700">{apartment.location.address}</p>
              </div>
            )}

            <a
              href="#"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Agent
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
