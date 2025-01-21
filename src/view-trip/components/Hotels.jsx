import React from 'react'

function Hotels({ trip }) {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grids-col-4'>
                {trip?.tripData?.hotelOptions?.map((item, index) => (
                    <div>
                        <img src="/placeholder.webp" className='rounded-xl' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Hotels;
