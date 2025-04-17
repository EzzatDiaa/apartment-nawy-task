import React, { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

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
  const [activeFilter, setActiveFilter] = useState<
    "all" | "unitName" | "unitNumber" | "project"
  >("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeFilter === "all") {
      onSearch({ search });
    } else {
      onSearch({ [activeFilter]: search });
    }
  };

  const handleFilterClick = (
    filter: "all" | "unitName" | "unitNumber" | "project",
  ) => {
    setActiveFilter(filter);
    setShowFilters(false);
  };

  return (
    <div className="w-full mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-xl shadow-sm"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search apartments..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative">
          <button
            type="button"
            className="w-full md:w-auto p-3 flex items-center justify-center space-x-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-50 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter className="text-gray-500" />
            <span>
              {activeFilter === "all"
                ? "All"
                : activeFilter === "unitName"
                  ? "Unit Name"
                  : activeFilter === "unitNumber"
                    ? "Unit Number"
                    : "Project"}
            </span>
          </button>

          {showFilters && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              <button
                type="button"
                className={`w-full text-left p-3 hover:bg-gray-100 ${
                  activeFilter === "all" ? "bg-primary-50 text-primary-700" : ""
                }`}
                onClick={() => handleFilterClick("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`w-full text-left p-3 hover:bg-gray-100 ${
                  activeFilter === "unitName"
                    ? "bg-primary-50 text-primary-700"
                    : ""
                }`}
                onClick={() => handleFilterClick("unitName")}
              >
                Unit Name
              </button>
              <button
                type="button"
                className={`w-full text-left p-3 hover:bg-gray-100 ${
                  activeFilter === "unitNumber"
                    ? "bg-primary-50 text-primary-700"
                    : ""
                }`}
                onClick={() => handleFilterClick("unitNumber")}
              >
                Unit Number
              </button>
              <button
                type="button"
                className={`w-full text-left p-3 hover:bg-gray-100 ${
                  activeFilter === "project"
                    ? "bg-primary-50 text-primary-700"
                    : ""
                }`}
                onClick={() => handleFilterClick("project")}
              >
                Project
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;
