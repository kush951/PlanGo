import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripComponent from './components/userTripComponent';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]); // Initialize with an empty array

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/'); // Redirect to home if no user is found
            return;
        }
        try {
            const tripsQuery = query(
                collection(db, 'AITrips'),
                where('userEmail', '==', user.email)
            );

            const querySnapshot = await getDocs(tripsQuery);
            const trips = [];
            querySnapshot.forEach((doc) => {
                trips.push({ id: doc.id, ...doc.data() });
            });
            setUserTrips(trips); // Update the state with the fetched trips
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const handleDelete = (tripId) => {
        setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                {userTrips.map((trip) => (
                    <UserTripComponent key={trip.id} trip={trip} onDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
}

export default MyTrips;