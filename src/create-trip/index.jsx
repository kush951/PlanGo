import React, { useState } from "react";

function CreateTrip() {
    const [query, setQuery] = useState(""); // Holds the input value
    const [results, setResults] = useState([]); // Holds the search results

    // Fetch suggestions from Nominatim API
    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);

        if (searchTerm.length > 2) { // Fetch only if input length > 2
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
            );
            const data = await response.json();
            setResults(data);
        } else {
            setResults([]); // Clear suggestions if input is too short
        }
    };

    // Handle selection of a place
    const handleSelect = (place) => {
        setQuery(place.display_name); // Set the selected place as input value
        setResults([]); // Clear suggestions after selection
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Provide basic information, and our trip planner will generate a
                customized itinerary.
            </p>

            <div className="mt-20">
                <h2 className="text-xl my-3 font-medium">Destination?</h2>
                <div className="relative">
                    {/* Input field for searching places */}
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search for a destination..."
                        className="border px-3 py-2 w-full"
                    />

                    {/* Suggestion dropdown */}
                    {results.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto">
                            {results.map((result) => (
                                <li
                                    key={result.place_id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(result)}
                                >
                                    {result.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateTrip;
