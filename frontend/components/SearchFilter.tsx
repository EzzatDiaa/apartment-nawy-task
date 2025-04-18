import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

interface SearchFilterProps {
  onSearch: (params: {
    search?: string;
    unitName?: string;
    unitNumber?: string;
    project?: string;
  }) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedsAndBaths, setBedsAndBaths] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create search parameters object
    let searchParams: {
      search?: string;
      unitName?: string;
      unitNumber?: string;
      project?: string;
    } = {};

    // Add the general search term if provided
    if (search) {
      searchParams.search = search;
    }

    // Add other search parameters based on dropdown selections
    // This is a simplified example - you might want to adapt this based on your backend API
    if (propertyType) {
      searchParams.unitName = propertyType;
    }

    onSearch(searchParams);
  };

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <h2 className="text-lg font-medium">Find Properties</h2>
      </div>

      {/* Search inputs */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="w-full mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Area, Unit Name, Project"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="" className="text-black font-normal">
                Property Types
              </option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={bedsAndBaths}
              onChange={(e) => setBedsAndBaths(e.target.value)}
            >
              <option value="" className="text-black font-normal">
                Beds and Baths
              </option>
              <option value="1">1+ Bed</option>
              <option value="2">2+ Beds</option>
              <option value="3">3+ Beds</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="" className="text-black font-normal">
                Price Range
              </option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000-2000">$1000 - $2000</option>
              <option value="2000+">$2000+</option>
            </select>
            <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
