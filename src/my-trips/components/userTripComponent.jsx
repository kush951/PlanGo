import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserTripComponent({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('./placeholder.webp'); // Default placeholder image

    useEffect(() => {
        if (trip?.userSelection?.destination) {
            fetchTripPhoto(trip.userSelection.destination);
        }
    }, [trip]);

    const fetchTripPhoto = async (query) => {
        const apiKey = '48383429-de6dbc4cac2cc84e9a00c58d3';
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;

        try {
            const response = await axios.get(url);
            if (response.data.hits.length > 0) {
                setPhotoUrl(response.data.hits[0].webformatURL); // Use the first photo from results
            }
        } catch (error) {
            console.error('Error fetching photo:', error);
        }
    };


    return (
        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition all '>

                <img
                    src={photoUrl}
                    alt={trip?.userSelection?.destination || 'Trip Destination'}
                    className="object-cover rounded-xl mt-4 w-full h-60"
                />
                <br />
                <div>
                    <h2 className="font-bold text-lg">{trip?.userSelection?.destination}</h2>
                    <h2 className="text-sm text-gray-500">
                        {trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget
                    </h2>
                </div>
            </div>
        </Link >
    );
}

export default UserTripComponent;
