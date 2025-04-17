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

  const defaultImage = "/default-apartment.jpg";
  const imageUrl = images && images.length > 0 ? images[0] : defaultImage;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${featured ? "border-2 border-blue-500" : ""}`}
    >
      <Link href={`/apartments/${id}`}>
        <div className="relative h-48 overflow-hidden">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
          {featured && (
            <div className="absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 text-xs font-bold">
              Featured
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg truncate">{unitName}</h3>
              <p className="text-gray-600 text-sm">{`${unitNumber}, ${project}`}</p>
            </div>
            <p className="font-bold text-xl text-blue-600">
              ${price.toLocaleString()}
            </p>
          </div>

          <div className="flex justify-between mt-4 text-gray-700">
            <div className="flex items-center">
              <FaBed className="mr-1" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center">
              <FaRulerCombined className="mr-1" />
              <span>{area} m²</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ApartmentCard;
