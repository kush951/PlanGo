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


                            {item.places?.map((place, placeIndex) => (
                                <PlaceCardItem
                                    key={placeIndex}
                                    place={place}
                                    dayWisePlan={item.dayWisePlan}
                                />
                            ))}
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