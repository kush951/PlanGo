import React from 'react'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grids-col-4 gap-5'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <div className='hover:scale-105 transition-all cursor-pointer'>
                        <img src="/placeholder.webp" className='rounded-xl' />

                        <div className='my-2 flex flex-col gap-2'>
                            <h2 className='font-medium'>{hotel?.hotelName}</h2>
                            <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                            <h2 className='text-sm'>💵 {hotel?.price}</h2>
                            <h2 className='text-sm'>⭐ {hotel?.rating}</h2>

                        </div>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default Hotels;
