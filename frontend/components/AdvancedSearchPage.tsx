import { useState, useEffect, useMemo, useRef } from "react";
import { FaSearch, FaHeart, FaShareAlt, FaTag } from "react-icons/fa";
import Layout from "../components/Layout";
import { fetchApartments } from "../services/api";
import { Apartment } from "../types/apartment";

export default function AdvancedSearchPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [allApartments, setAllApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedDevelopers, setSelectedDevelopers] = useState<string[]>([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>(
    [],
  );

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [maxPossiblePrice, setMaxPossiblePrice] = useState(25000000);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const maxThumbRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingMin = useRef(false);
  const isDraggingMax = useRef(false);

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const sortRef = useRef<HTMLDivElement>(null);

  const uniqueAreas = useMemo(() => {
    if (!allApartments.length) return [];

    const areas = new Set<string>();

    allApartments.forEach((apartment) => {
      if (apartment.location?.address) {
        const addressParts = apartment.location.address.split(",");
        if (addressParts.length > 1) {
          const area = addressParts[addressParts.length - 1].trim();
          areas.add(area);
        }
      }
    });

    return Array.from(areas);
  }, [allApartments]);

  const uniqueDevelopers = useMemo(() => {
    if (!allApartments.length) return [];

    const developers = new Set<string>();

    allApartments.forEach((apartment) => {
      if (apartment.project) {
        developers.add(apartment.project);
      }
    });

    return Array.from(developers);
  }, [allApartments]);

  const uniquePropertyTypes = useMemo(() => {
    if (!allApartments.length) return [];

    const types = new Set<string>();

    allApartments.forEach((apartment) => {
      if (apartment.propertyType) {
        types.add(apartment.propertyType);
      }
    });

    return Array.from(types);
  }, [allApartments]);

  useEffect(() => {
    if (allApartments.length > 0) {
      const highestPrice = Math.max(...allApartments.map((apt) => apt.price));
      setMaxPossiblePrice(highestPrice);
      setPriceRange([0, highestPrice]);
      setMaxPrice(highestPrice.toString());
    }
  }, [allApartments]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadAllApartments = async () => {
    try {
      setLoading(true);
      const data = await fetchApartments();
      setAllApartments(data);
      setApartments(data);
      setError(null);
    } catch (err) {
      console.error("Error loading apartments:", err);
      setError("Failed to load apartments. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filteredApartments = [...allApartments];

    if (search) {
      filteredApartments = filteredApartments.filter(
        (apartment) =>
          apartment.unitName.toLowerCase().includes(search.toLowerCase()) ||
          apartment.unitNumber.toLowerCase().includes(search.toLowerCase()) ||
          apartment.project.toLowerCase().includes(search.toLowerCase()) ||
          apartment.description.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedAreas.length > 0) {
      filteredApartments = filteredApartments.filter((apartment) => {
        if (apartment.location?.address) {
          const addressParts = apartment.location.address.split(",");
          if (addressParts.length > 1) {
            const area = addressParts[addressParts.length - 1].trim();
            return selectedAreas.includes(area);
          }
        }
        return false;
      });
    }

    if (selectedDevelopers.length > 0) {
      filteredApartments = filteredApartments.filter((apartment) =>
        selectedDevelopers.includes(apartment.project),
      );
    }

    if (selectedBedrooms.length > 0) {
      filteredApartments = filteredApartments.filter((apartment) => {
        const minBedrooms = parseInt(selectedBedrooms[0]);
        if (selectedBedrooms[0] === "5+") {
          return apartment.bedrooms >= 5;
        }
        return apartment.bedrooms >= minBedrooms;
      });
    }

    if (selectedBathrooms.length > 0) {
      filteredApartments = filteredApartments.filter((apartment) => {
        const minBathrooms = parseInt(selectedBathrooms[0]);
        if (selectedBathrooms[0] === "5+") {
          return apartment.bathrooms >= 5;
        }
        return apartment.bathrooms >= minBathrooms;
      });
    }

    if (selectedPropertyTypes.length > 0) {
      filteredApartments = filteredApartments.filter((apartment) =>
        selectedPropertyTypes.includes(apartment.propertyType),
      );
    }

    if (priceRange[0] > 0 || priceRange[1] < maxPossiblePrice) {
      filteredApartments = filteredApartments.filter(
        (apartment) =>
          apartment.price >= priceRange[0] && apartment.price <= priceRange[1],
      );
    }

    if (
      sortOption === "Minimum Developer Price" ||
      sortOption === "Minimum Resale Price"
    ) {
      filteredApartments.sort((a, b) => a.price - b.price);
    } else if (
      sortOption === "Maximum Developer Price" ||
      sortOption === "Maximum Resale Price"
    ) {
      filteredApartments.sort((a, b) => b.price - a.price);
    } else if (sortOption === "Newest") {
      filteredApartments.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    setApartments(filteredApartments);
  };

  useEffect(() => {
    loadAllApartments();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    search,
    selectedAreas,
    selectedDevelopers,
    selectedBedrooms,
    selectedBathrooms,
    selectedPropertyTypes,
    priceRange,
    sortOption,
  ]);

  const handleAreaChange = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((a) => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const handleDeveloperChange = (developer: string) => {
    if (selectedDevelopers.includes(developer)) {
      setSelectedDevelopers(selectedDevelopers.filter((d) => d !== developer));
    } else {
      setSelectedDevelopers([...selectedDevelopers, developer]);
    }
  };

  const handleBedroomChange = (bedroom: string) => {
    if (selectedBedrooms.includes(bedroom)) {
      setSelectedBedrooms(selectedBedrooms.filter((b) => b !== bedroom));
    } else {
      setSelectedBedrooms([bedroom]);
    }
  };

  const handleBathroomChange = (bathroom: string) => {
    if (selectedBathrooms.includes(bathroom)) {
      setSelectedBathrooms(selectedBathrooms.filter((b) => b !== bathroom));
    } else {
      setSelectedBathrooms([bathroom]);
    }
  };

  const handlePropertyTypeChange = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const resetAllFilters = () => {
    setSearch("");
    setSelectedAreas([]);
    setSelectedDevelopers([]);
    setSelectedBedrooms([]);
    setSelectedBathrooms([]);
    setSelectedPropertyTypes([]);
    setPriceRange([0, maxPossiblePrice]);
    setMinPrice("");
    setMaxPrice(maxPossiblePrice.toString());
    setSortOption("");
  };

  const resetAreaFilter = () => {
    setSelectedAreas([]);
  };

  const resetDeveloperFilter = () => {
    setSelectedDevelopers([]);
  };

  const resetPropertyTypeFilter = () => {
    setSelectedPropertyTypes([]);
  };

  const resetPriceFilter = () => {
    setPriceRange([0, maxPossiblePrice]);
    setMinPrice("");
    setMaxPrice(maxPossiblePrice.toString());
  };

  const getAreaFromAddress = (address: string) => {
    if (!address) return "";
    const parts = address.split(",");
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    return "";
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setMinPrice(value);
    if (value === "") {
      setPriceRange([0, priceRange[1]]);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue <= priceRange[1]) {
        setPriceRange([numValue, priceRange[1]]);
      }
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setMaxPrice(value);
    if (value === "") {
      setPriceRange([priceRange[0], maxPossiblePrice]);
    } else {
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue >= priceRange[0]) {
        setPriceRange([priceRange[0], numValue]);
      }
    }
  };

  const handleMinThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingMin.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMaxThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingMax.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const trackLeft = trackRect.left;

    let percentage = Math.max(
      0,
      Math.min(100, ((e.clientX - trackLeft) / trackWidth) * 100),
    );

    const price = Math.round((percentage / 100) * maxPossiblePrice);

    if (isDraggingMin.current) {
      if (price <= priceRange[1]) {
        setPriceRange([price, priceRange[1]]);
        setMinPrice(price.toString());
      }
    } else if (isDraggingMax.current) {
      if (price >= priceRange[0]) {
        setPriceRange([priceRange[0], price]);
        setMaxPrice(price.toString());
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingMin.current = false;
    isDraggingMax.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const minThumbPosition = (priceRange[0] / maxPossiblePrice) * 100 + "%";
  const maxThumbPosition = (priceRange[1] / maxPossiblePrice) * 100 + "%";
  const selectedTrackWidth =
    ((priceRange[1] - priceRange[0]) / maxPossiblePrice) * 100 + "%";

  const handleSortOptionSelect = (option: string) => {
    setSortOption(option);
    setShowSortDropdown(false);
  };

  return (
    <Layout title="Apartments in Egypt">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Apartments In Egypt</h1>
            <p className="text-gray-600 mt-1">{apartments.length} Apartments</p>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-4">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Area, Compound, Real Estate Developer"
                className="w-full md:w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="flex space-x-3">
              <div ref={sortRef} className="relative">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center"
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                >
                  <span>{sortOption || "Sort By"}</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showSortDropdown && (
                  <div className="absolute z-50 right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {[
                      "Minimum Developer Price",
                      "Maximum Developer Price",
                      "Minimum Resale Price",
                      "Maximum Resale Price",
                      "Minimum Installment",
                      "Maximum Installment",
                      "Newest",
                      "Ready By",
                    ].map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSortOptionSelect(option)}
                      >
                        <input
                          type="radio"
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          checked={sortOption === option}
                          readOnly
                        />
                        <label className="ml-3 block text-gray-700">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center relative">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <span>Map View</span>
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Coming soon
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Price</h3>
                <button
                  className="text-blue-600 text-sm"
                  onClick={resetPriceFilter}
                >
                  Reset
                </button>
              </div>

              <div className="mt-4 mb-4">
                <div
                  ref={trackRef}
                  className="relative w-full h-1 bg-gray-200 rounded-full"
                >
                  <div
                    className="absolute h-1 bg-blue-100 rounded-full"
                    style={{
                      left: minThumbPosition,
                      width: selectedTrackWidth,
                    }}
                  ></div>

                  <div
                    ref={minThumbRef}
                    className="absolute top-1/2 w-6 h-6 -mt-3 -ml-3 bg-white border-2 border-blue-600 rounded-full cursor-pointer shadow"
                    style={{ left: minThumbPosition }}
                    onMouseDown={handleMinThumbMouseDown}
                  ></div>

                  <div
                    ref={maxThumbRef}
                    className="absolute top-1/2 w-6 h-6 -mt-3 -ml-3 bg-white border-2 border-blue-600 rounded-full cursor-pointer shadow"
                    style={{ left: maxThumbPosition }}
                    onMouseDown={handleMaxThumbMouseDown}
                  ></div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Min"
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                    value={minPrice ? parseInt(minPrice).toLocaleString() : ""}
                    onChange={handleMinPriceChange}
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Max"
                    className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                    value={maxPrice ? parseInt(maxPrice).toLocaleString() : ""}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Areas</h3>
                <button
                  className="text-blue-600 text-sm"
                  onClick={resetAreaFilter}
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2">
                {uniqueAreas.map((area, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`area-${index}`}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedAreas.includes(area)}
                      onChange={() => handleAreaChange(area)}
                    />
                    <label
                      htmlFor={`area-${index}`}
                      className="ml-2 text-gray-700"
                    >
                      {area}
                    </label>
                  </div>
                ))}

                {uniqueAreas.length === 0 && (
                  <p className="text-gray-500 text-sm italic">
                    No areas available
                  </p>
                )}
              </div>

              {uniqueAreas.length > 3 && (
                <button className="text-blue-600 text-sm mt-2">See More</button>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Developers</h3>
                <button
                  className="text-blue-600 text-sm"
                  onClick={resetDeveloperFilter}
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2">
                {uniqueDevelopers.slice(0, 3).map((developer, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`dev-${index}`}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedDevelopers.includes(developer)}
                      onChange={() => handleDeveloperChange(developer)}
                    />
                    <label
                      htmlFor={`dev-${index}`}
                      className="ml-2 text-gray-700"
                    >
                      {developer}
                    </label>
                  </div>
                ))}

                {uniqueDevelopers.length === 0 && (
                  <p className="text-gray-500 text-sm italic">
                    No developers available
                  </p>
                )}
              </div>

              {uniqueDevelopers.length > 3 && (
                <button className="text-blue-600 text-sm mt-2">See More</button>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Bedrooms</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, "5+"].map((bedroom) => (
                  <button
                    key={bedroom}
                    className={`flex justify-center items-center w-8 h-8 rounded-full ${
                      selectedBedrooms.includes(bedroom.toString())
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleBedroomChange(bedroom.toString())}
                  >
                    {bedroom}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3">Bathrooms</h3>
              <div className="flex gap-2">
                {[1, 2, 3, 4, "5+"].map((bathroom) => (
                  <button
                    key={bathroom}
                    className={`flex justify-center items-center w-8 h-8 rounded-full ${
                      selectedBathrooms.includes(bathroom.toString())
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => handleBathroomChange(bathroom.toString())}
                  >
                    {bathroom}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">Property Types</h3>
                <button
                  className="text-blue-600 text-sm"
                  onClick={resetPropertyTypeFilter}
                >
                  Reset
                </button>
              </div>

              <div className="space-y-2">
                {uniquePropertyTypes.map((type, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`type-${index}`}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                      checked={selectedPropertyTypes.includes(type)}
                      onChange={() => handlePropertyTypeChange(type)}
                    />
                    <label
                      htmlFor={`type-${index}`}
                      className="ml-2 text-gray-700"
                    >
                      {type}
                    </label>
                  </div>
                ))}

                {uniquePropertyTypes.length === 0 && (
                  <p className="text-gray-500 text-sm italic">
                    No property types available
                  </p>
                )}
              </div>
            </div>

            <button
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg"
              onClick={resetAllFilters}
            >
              Reset All Filters
            </button>
          </div>

          <div className="flex-1">
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
              <div className="space-y-6">
                {apartments.map((apartment) => {
                  const areaName = apartment.location
                    ? getAreaFromAddress(apartment.location.address)
                    : "";

                  return (
                    <div
                      key={apartment.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-2/5 h-64 relative">
                          <div
                            className="w-full h-full bg-cover bg-center bg-gray-200"
                            style={{
                              backgroundImage: `url(/default-apartment.jpg)`,
                            }}
                          />
                          {apartment.featured && (
                            <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                              Featured
                            </div>
                          )}
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-red-500">
                              <FaHeart className="w-4 h-4" />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-blue-500">
                              <FaShareAlt className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="w-full md:w-3/5 p-6">
                          <div className="flex flex-col h-full justify-between">
                            <div>
                              <div className="flex items-center text-gray-500 text-sm mb-2">
                                {areaName && (
                                  <span className="bg-gray-100 px-2 py-1 rounded mr-2">
                                    {areaName}
                                  </span>
                                )}
                                <span>{apartment.propertyType}</span>
                              </div>

                              <h2 className="text-xl font-bold mb-2 text-gray-900">
                                {apartment.unitName}
                              </h2>

                              <p className="text-gray-600 text-sm mb-4">
                                Discover {apartment.project} - With financing up
                                to 10 Years
                              </p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-gray-600 text-sm">
                                  {apartment.propertyType}
                                </span>
                                {apartment.bedrooms > 0 && (
                                  <span className="text-gray-600 text-sm">
                                    • {apartment.bedrooms} Bedroom(s)
                                  </span>
                                )}
                                {apartment.bathrooms > 0 && (
                                  <span className="text-gray-600 text-sm">
                                    • {apartment.bathrooms} Bathroom(s)
                                  </span>
                                )}
                                {apartment.area > 0 && (
                                  <span className="text-gray-600 text-sm">
                                    • {apartment.area} m²
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center mb-4">
                                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                                  <FaTag className="mr-1" />
                                  <span>Offer Included</span>
                                </div>
                                <div className="flex items-center ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                                  <span>Trending Now</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                              <div>
                                <div className="text-gray-500 text-xs">
                                  Price
                                </div>
                                <div className="text-xl font-bold text-blue-600">
                                  ${apartment.price.toLocaleString()}
                                </div>
                              </div>

                              <button
                                onClick={() =>
                                  (window.location.href = `/apartments/${apartment.id}`)
                                }
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
