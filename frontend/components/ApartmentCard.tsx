import React from "react";
import Link from "next/link";
import { Apartment } from "../types/apartment";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

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
  } = apartment;

  const defaultImage = "/placeholder-apartment.jpg"; // Make sure this exists in public folder
  const imageUrl = images && images.length > 0 ? images[0] : defaultImage;

  return (
    <div
      className={`bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px] ${
        featured ? "ring-2 ring-primary-500" : ""
      }`}
    >
      <Link href={`/apartments/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <div
            className="h-full w-full bg-cover bg-center transform transition-transform duration-500 hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {featured && (
            <div className="absolute top-0 right-0 bg-primary-500 text-white px-3 py-1 rounded-bl-lg text-xs font-semibold uppercase tracking-wider">
              Featured
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-800 hover:text-primary-600 transition-colors duration-200">
                {unitName}
              </h3>
              <p className="text-gray-600 text-sm">{`${unitNumber}, ${project}`}</p>
            </div>
            <p className="font-bold text-xl text-primary-600">
              ${price.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-between mt-4 text-gray-700">
            <div className="flex items-center space-x-1">
              <FaBed className="text-primary-400" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaBath className="text-primary-400" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaRulerCombined className="text-primary-400" />
              <span>{area} m²</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ApartmentCard;
