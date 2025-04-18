import React from "react";
import Link from "next/link";
import { Apartment } from "../types/apartment";
import { FaBed, FaBath, FaRulerCombined, FaArrowRight } from "react-icons/fa";

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  const {
    id,
    unitName,
    unitNumber,
    project,
    price,
    bedrooms,
    bathrooms,
    area,
    images,
    featured,
    description,
  } = apartment;

  const defaultImage = "/default-apartment.jpg";
  const imageUrl = defaultImage;
  // images && images.length > 0 ? images[0] : defaultImage;
  // Create a short description preview (first 100 characters)
  const shortDescription = description
    ? description.length > 100
      ? `${description.substring(0, 100)}...`
      : description
    : "No description available";

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <Link href={`/apartments/${id}`}>
        <div className="relative">
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {featured && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs font-bold rounded-md">
              Featured
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/apartments/${id}`}>
          <h5 className="mb-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {unitName}
          </h5>
        </Link>

        <p className="text-gray-600 text-sm mb-3">{`${unitNumber}, ${project}`}</p>

        <div className="flex justify-between text-sm text-gray-700 mb-3 border-t border-b border-gray-100 py-2">
          <div className="flex items-center gap-1">
            <FaBed className="text-blue-500" />
            <span>{bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-blue-500" />
            <span>{bathrooms} baths</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-blue-500" />
            <span>{area} m²</span>
          </div>
        </div>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {shortDescription}
        </p>

        <div className="flex justify-between items-center">
          <p className="font-bold text-xl text-blue-600">
            ${price.toLocaleString()}
          </p>

          <Link
            href={`/apartments/${id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            View
            <FaArrowRight className="w-3.5 h-3.5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;
