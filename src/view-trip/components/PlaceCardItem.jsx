import React from 'react';
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place, dayWisePlan }) {
    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.placeName} target="_blank">
            <div className="mt-2 p-3 border rounded-xl flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">


                <img src="/placeholder.webp"
                    className='w-[130px] h-[130px] rounded-xl'
                />
                <ul className="pl-4 ">
                    <li className="mt-1">
                        <strong>{place.placeName}</strong>
                        <p className="text-sm text-gray-500">
                            {place.placeDetails}
                        </p>
                        <p className="text-sm mt-2">
                            <strong>🕙 Time to Travel:</strong> {place.timeToTravel}
                        </p>
                        {/* <Button size="sm"><FaMapMarkedAlt /></Button> */}
                        {/* <p className="text-sm">
                            <strong>Ticket Pricing:</strong> {place.ticketPricing}
                        </p> */}
                    </li>
                </ul>
                {/* <p className="text-sm text-gray-600">
                    <strong>Day Plan:</strong> {dayWisePlan}
                </p> */}
            </div>
        </Link>
    );
}

export default PlaceCardItem;