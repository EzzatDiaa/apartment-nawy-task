import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";

interface SearchFilterProps {
  onSearch: (params: {
    search?: string;
    unitName?: string;
    unitNumber?: string;
    project?: string;
    propertyType?: string;
    bedrooms?: string;
    priceMin?: string;
    priceMax?: string;
  }) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedsAndBaths, setBedsAndBaths] = useState("");
  const [priceMin, setPriceMin] = useState("500000");
  const [priceMax, setPriceMax] = useState("25000000");

  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [isBedsAndBathsOpen, setIsBedsAndBathsOpen] = useState(false);
  const [isPriceRangeOpen, setIsPriceRangeOpen] = useState(false);

  const [selectedBedrooms, setSelectedBedrooms] = useState("");
  const [selectedBathrooms, setSelectedBathrooms] = useState("");

  const propertyTypeRef = useRef<HTMLDivElement>(null);
  const bedsAndBathsRef = useRef<HTMLDivElement>(null);
  const priceRangeRef = useRef<HTMLDivElement>(null);

  const MIN_PRICE = 500000;
  const MAX_PRICE = 25000000;
  const [minThumbPosition, setMinThumbPosition] = useState(0);
  const [maxThumbPosition, setMaxThumbPosition] = useState(100);

  const trackRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<"min" | "max" | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        propertyTypeRef.current &&
        !propertyTypeRef.current.contains(event.target as Node)
      ) {
        setIsPropertyTypeOpen(false);
      }
      if (
        bedsAndBathsRef.current &&
        !bedsAndBathsRef.current.contains(event.target as Node)
      ) {
        setIsBedsAndBathsOpen(false);
      }
      if (
        priceRangeRef.current &&
        !priceRangeRef.current.contains(event.target as Node)
      ) {
        setIsPriceRangeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (priceMin) {
      const minPrice = parseInt(priceMin);
      const percentage =
        ((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
      setMinThumbPosition(
        Math.max(0, Math.min(percentage, maxThumbPosition - 5)),
      );
    }
  }, [priceMin, maxThumbPosition]);

  useEffect(() => {
    if (priceMax) {
      const maxPrice = parseInt(priceMax);
      const percentage =
        ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100;
      setMaxThumbPosition(
        Math.min(100, Math.max(percentage, minThumbPosition + 5)),
      );
    }
  }, [priceMax, minThumbPosition]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let searchParams: {
      search?: string;
      propertyType?: string;
      bedrooms?: string;
      priceMin?: string;
      priceMax?: string;
    } = {};

    if (search) {
      searchParams.search = search;
    }

    if (propertyType) {
      searchParams.propertyType = propertyType;
    }

    if (selectedBedrooms) {
      searchParams.bedrooms = selectedBedrooms;
    }

    if (priceMin) {
      searchParams.priceMin = priceMin;
    }

    if (priceMax) {
      searchParams.priceMax = priceMax;
    }

    onSearch(searchParams);
  };

  const applyPriceRange = () => {
    setIsPriceRangeOpen(false);
    handleSubmit(new Event("submit") as any);
  };

  const selectBedroom = (value: string) => {
    setSelectedBedrooms(value === selectedBedrooms ? "" : value);
  };

  const selectBathroom = (value: string) => {
    setSelectedBathrooms(value === selectedBathrooms ? "" : value);
  };

  const handleThumbMouseDown =
    (thumb: "min" | "max") => (e: React.MouseEvent) => {
      e.preventDefault();
      isDragging.current = thumb;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

  const handleMouseMove = (e: MouseEvent) => {
    if (!trackRef.current || !isDragging.current) return;

    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const trackLeft = trackRect.left;

    let percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - trackLeft) / trackWidth) * 100),
    );

    if (isDragging.current === "min") {
      if (percentage < maxThumbPosition - 5) {
        setMinThumbPosition(percentage);
        const minPrice = Math.round(
          MIN_PRICE + (percentage / 100) * (MAX_PRICE - MIN_PRICE),
        );
        setPriceMin(minPrice.toString());
      }
    } else if (isDragging.current === "max") {
      if (percentage > minThumbPosition + 5) {
        setMaxThumbPosition(percentage);
        const maxPrice = Math.round(
          MIN_PRICE + (percentage / 100) * (MAX_PRICE - MIN_PRICE),
        );
        setPriceMax(maxPrice.toString());
      }
    }
  };

  const handleMouseUp = () => {
    isDragging.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handlePriceInputChange =
    (type: "min" | "max") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "");

      if (type === "min") {
        if (value === "") {
          setPriceMin(MIN_PRICE.toString());
        } else {
          const numValue = parseInt(value);
          if (!isNaN(numValue)) {
            setPriceMin(numValue.toString());
          }
        }
      } else {
        if (value === "") {
          setPriceMax(MAX_PRICE.toString());
        } else {
          const numValue = parseInt(value);
          if (!isNaN(numValue)) {
            setPriceMax(numValue.toString());
          }
        }
      }
    };

  return (
    <div className="w-full bg-white rounded-lg overflow-visible shadow-md border border-gray-200">
      <div className="border-b border-gray-200">
        <div className="text-center py-4">
          <h2 className="text-xl font-medium text-gray-800">Properties</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="w-full mb-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Area, Compound, Real Estate Developer"
              className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-900"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <div ref={propertyTypeRef} className="relative">
            <div
              className="w-full p-3 pl-4 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
              onClick={() => setIsPropertyTypeOpen(!isPropertyTypeOpen)}
            >
              <span
                className={propertyType ? "text-gray-900" : "text-gray-500"}
              >
                {propertyType || "Property Types"}
              </span>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-200 ${isPropertyTypeOpen ? "transform rotate-180" : ""}`}
              />
            </div>

            {isPropertyTypeOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-2 overflow-hidden">
                <div
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${propertyType === "Apartment" ? "text-blue-600" : ""}`}
                  onClick={() => {
                    setPropertyType(
                      propertyType === "Apartment" ? "" : "Apartment",
                    );
                    setIsPropertyTypeOpen(false);
                  }}
                >
                  Apartment
                </div>
                <div
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${propertyType === "Villa" ? "text-blue-600" : ""}`}
                  onClick={() => {
                    setPropertyType(propertyType === "Villa" ? "" : "Villa");
                    setIsPropertyTypeOpen(false);
                  }}
                >
                  Villa
                </div>
                <div
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${propertyType === "Townhouse" ? "text-blue-600" : ""}`}
                  onClick={() => {
                    setPropertyType(
                      propertyType === "Townhouse" ? "" : "Townhouse",
                    );
                    setIsPropertyTypeOpen(false);
                  }}
                >
                  Townhouse
                </div>
              </div>
            )}
          </div>

          <div ref={bedsAndBathsRef} className="relative">
            <div
              className="w-full p-3 pl-4 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
              onClick={() => setIsBedsAndBathsOpen(!isBedsAndBathsOpen)}
            >
              <span
                className={
                  selectedBedrooms || selectedBathrooms
                    ? "text-gray-900"
                    : "text-gray-500"
                }
              >
                {selectedBedrooms && selectedBathrooms
                  ? `${selectedBedrooms} Bed, ${selectedBathrooms} Bath`
                  : selectedBedrooms
                    ? `${selectedBedrooms} Bed`
                    : selectedBathrooms
                      ? `${selectedBathrooms} Bath`
                      : "Beds and Baths"}
              </span>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-200 ${isBedsAndBathsOpen ? "transform rotate-180" : ""}`}
              />
            </div>

            {isBedsAndBathsOpen && (
              <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg py-4 px-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bedrooms</h3>
                  <div className="flex gap-2">
                    {["1", "2", "3", "4", "5+"].map((value) => (
                      <button
                        key={`bedroom-${value}`}
                        type="button"
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedBedrooms === value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        onClick={() => selectBedroom(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Bathrooms
                  </h3>
                  <div className="flex gap-2">
                    {["1", "2", "3", "4", "5+"].map((value) => (
                      <button
                        key={`bathroom-${value}`}
                        type="button"
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedBathrooms === value
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                        onClick={() => selectBathroom(value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div ref={priceRangeRef} className="relative">
            <div
              className="w-full p-3 pl-4 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between"
              onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)}
            >
              <span className="text-gray-500">Price Range</span>
              <FaChevronDown
                className={`text-gray-400 transition-transform duration-200 ${isPriceRangeOpen ? "transform rotate-180" : ""}`}
              />
            </div>

            {isPriceRangeOpen && (
              <div className="absolute z-50 mt-1 min-w-[300px] right-0 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Price Range</h3>
                </div>

                <div className="p-4 space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="500,000"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      value={parseInt(priceMin).toLocaleString()}
                      onChange={handlePriceInputChange("min")}
                    />
                    <input
                      type="text"
                      placeholder="25,000,000"
                      className="flex-1 p-2 border border-gray-300 rounded-lg"
                      value={parseInt(priceMax).toLocaleString()}
                      onChange={handlePriceInputChange("max")}
                    />
                  </div>

                  <div
                    ref={trackRef}
                    className="relative h-1 bg-gray-200 rounded my-6"
                  >
                    <div
                      className="absolute h-1 bg-blue-100 rounded"
                      style={{
                        left: `${minThumbPosition}%`,
                        width: `${maxThumbPosition - minThumbPosition}%`,
                      }}
                    ></div>

                    <div
                      ref={minThumbRef}
                      className="absolute top-1/2 -mt-2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 cursor-pointer"
                      style={{ left: `${minThumbPosition}%` }}
                      onMouseDown={handleThumbMouseDown("min")}
                    ></div>

                    <div
                      ref={maxThumbRef}
                      className="absolute top-1/2 -mt-2 w-4 h-4 rounded-full bg-white border-2 border-blue-600 cursor-pointer"
                      style={{ left: `${maxThumbPosition}%` }}
                      onMouseDown={handleThumbMouseDown("max")}
                    ></div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg"
                    onClick={applyPriceRange}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
