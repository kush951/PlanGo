import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SelectTravelesList, SelectBudgetOptions } from "../constants/options";
import { Button } from '@/components/ui/button';
import { toast } from "sonner"


function CreateTrip() {
    const [query, setQuery] = useState(""); // Holds the input value for search
    const [results, setResults] = useState([]); // Holds the search results
    const [destination, setDestination] = useState(""); // Holds the selected destination

    // Log destination whenever it changes
    useEffect(() => {
        if (destination) {
            console.log("Selected Destination:", destination);
        }
    }, [destination]);

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
        setDestination(place.display_name); // Update the destination state
    };

    const [formData, setFormData] = useState({});

    const handleInputChange = (name, value) => {

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);


    const OnGenerateTrip = () => {
        // Ensure that formData.noOfDays exists and is valid
        if (!formData?.noOfDays || formData.noOfDays > 5 && !formData?.destination || !formData?.budget || !formData.traveler) {
            toast("Please fill all details")
            return;
        }

        console.log("Generating trip with the following details:", formData);
    }





    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Provide basic information, and our trip planner will generate a
                customized itinerary.
            </p>

            <div className="mt-20">
                <h2 className="text-xl my-3 font-medium">Destination?</h2>
                <div>
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
                                    onClick={() => {
                                        handleSelect(result);
                                        handleInputChange('destination', result.display_name); // Handle destination change
                                    }}
                                >
                                    {result.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <br />
            <div>
                <h2 className="text-xl my-3 font-medium">How many days are you planning to stay?</h2>
                <Input placeholder={'Ex. 3'} type="number"
                    onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
            </div>
            <br />
            <div>
                <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData?.budget == item.title && 'shadow-lg border-black'}`}>
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <br />
            <div>
                <h2 className="text-xl my-3 font-medium">Who do you want to travel with?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectTravelesList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange('traveler', item.title)} // Use item.title here
                            className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData?.traveler === item.title ? 'shadow-lg border-black' : ''}`}
                        >
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.desc}</h2>
                        </div>
                    ))}

                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button onClick={OnGenerateTrip}>Generate Trip</Button>
            </div>
        </div>
    );
}

export default CreateTrip;
