import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
    // Convert itinerary map to an array
    const itineraryArray = trip.tripData?.itinerary
        ? Object.entries(trip.tripData.itinerary) // Convert map to array with keys (day1, day2)
        : [];

    return (
        <div>
            <h2 className='font-bold text-lg'>Places To Visit</h2>
            <div>
                {itineraryArray.length > 0 ? (
                    itineraryArray.map(([dayKey, item], index) => (
                        <div key={index} className="border-b py-4">
                            <h2 className='font-medium text-lg'>
                                {item.day || `Day ${index + 1}`}
                            </h2>
                            <p className="text-sm text-orange-600">
                                <strong>Best Time to Visit:</strong> {item.bestTimeToVisit}
                            </p>

                            <PlaceCardItem place={place} />

                            <p className="text-sm text-gray-600">
                                <strong>Day Plan:</strong> {item.dayWisePlan}
                            </p>
                            <div className="mt-2">
                                <h3 className="font-medium text-md">Places to Visit:</h3>



                                {item.places?.length > 0 ? (
                                    <ul className="pl-4 list-disc">
                                        {item.places.map((place, placeIndex) => (
                                            <li key={placeIndex} className="mt-1">
                                                <strong>{place.placeName}</strong>
                                                <p className="text-sm">
                                                    {place.placeDetails}
                                                </p>
                                                <p className="text-sm">
                                                    <strong>Time to Travel:</strong> {place.timeToTravel}
                                                </p>
                                                <p className="text-sm">
                                                    <strong>Ticket Pricing:</strong> {place.ticketPricing}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500">No places listed for this day.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No itinerary available</p>
                )}
            </div>
        </div>
    );
}

export default PlacesToVisit;
