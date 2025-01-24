import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

function InfoSection({ trip }) {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip]);

    const GetPlacePhoto = async () => {
        const apiKey = '48383429-de6dbc4cac2cc84e9a00c58d3';
        const query = trip?.userSelection?.destination;
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`;

        try {
            const response = await axios.get(url);
            setPhotos(response.data.hits);
            console.log(response.data.hits);
        } catch (error) {
            console.error('Error fetching photos:', error);
        }
    };

    const shareOnWhatsApp = () => {
        const message = `Check out this trip to ${trip?.userSelection?.destination}!
        - Duration: ${trip?.userSelection?.noOfDays} days
        - Budget: ${trip?.userSelection?.budget}
        - Number of Travelers: ${trip?.userSelection?.traveler}`;

        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div>
            {photos.length > 0 ? (
                <img src={photos[0].webformatURL} className='h-[340px] w-full object-cover rounded-xl' alt={trip?.userSelection?.destination} />
            ) : (
                <img src="/placeholder.webp" className='h-[340px] w-full object-cover rounded-xl' alt="placeholder" />
            )}
            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.destination}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip?.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveller: {trip?.userSelection?.traveler} </h2>
                    </div>
                </div>
                <Button onClick={shareOnWhatsApp}><IoIosSend /></Button>
            </div>
        </div>
    );
}

export default InfoSection;