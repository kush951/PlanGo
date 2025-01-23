import React, { useEffect, useState } from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

function PlaceCardItem({ place, dayWisePlan }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.webp'); // Default placeholder image

    useEffect(() => {
        if (place?.placeName) {
            fetchPlacePhoto(place.placeName);
        }
    }, [place]);

    const fetchPlacePhoto = async (query) => {
        const apiKey = '48383429-de6dbc4cac2cc84e9a00c58d3';
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;

        try {
            const response = await axios.get(url);
            console.log('API response:', response); // Log the response
            if (response.data.hits.length > 0) {
                setPhotoUrl(response.data.hits[0].webformatURL); // Use the first photo from results
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
        }
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target="_blank">
            <div className="mt-2 p-3 border rounded-xl flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
                <img
                    src={photoUrl}
                    alt={place?.placeName}
                    className="w-[130px] h-[130px] rounded-xl object-cover"
                />
                <ul className="pl-4">
                    <li className="mt-1">
                        <strong>{place.placeName}</strong>
                        <p className="text-sm text-gray-500">
                            {place.placeDetails}
                        </p>
                        <p className="text-sm mt-2">
                            <strong>🕙 Time to Travel:</strong> {place?.timeToTravel || 'N/A'}
                        </p>
                    </li>
                </ul>
            </div>
        </Link>
    );
}

export default PlaceCardItem;