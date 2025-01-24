import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Hotels({ trip }) {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        if (trip?.tripData?.hotelOptions) {
            fetchPhotos();
        }
    }, [trip]);

    const fetchPhotos = async () => {
        const apiKey = '48383429-de6dbc4cac2cc84e9a00c58d3';
        const query = trip?.userSelection?.destination || 'travel';
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;

        try {
            const response = await axios.get(url);
            const shuffledPhotos = shuffleArray(response.data.hits); // Shuffle to randomize the photo order
            setPhotos(shuffledPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    // Helper function to shuffle an array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    return (
        <div>
            <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link
                        key={hotel?.hotelName || index} // Ensure a unique key
                        to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName} ${hotel?.hotelAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="hover:scale-105 transition-all cursor-pointer">
                            <img
                                src={
                                    photos[index]?.webformatURL || '/placeholder.webp'
                                }
                                className="rounded-xl h-[200px] w-full object-cover"
                                alt={hotel?.hotelName}
                            />

                            <div className="my-2 flex flex-col gap-2">
                                <h2 className="font-medium">{hotel?.hotelName}</h2>
                                <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                                <h2 className="text-sm">💵 {hotel?.price}</h2>
                                <h2 className="text-sm">⭐ {hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Hotels;
