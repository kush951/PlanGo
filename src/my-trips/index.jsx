import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import userTripComponent from './components/userTripComponent';

function MyTrips() {
    const navigate = useNavigate();

    const [userTrips, setUserTrips] = useState();

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/'); // Redirect to home if no user is found
            return;
        }
        setUserTrips([]);
        try {
            const tripsQuery = query(
                collection(db, 'AITrips'), // Reference the 'AITrips' collection
                where('userEmail', '==', user.email) // Add the where clause
            );

            const querySnapshot = await getDocs(tripsQuery); // Pass the query directly to getDocs
            querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data());
                setUserTrips(preVal => [...preVal, doc.data()])
            });
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
            <div>
                {/* {userTrips.map((trip, index) => {
                    <userTripComponent trip={trip} />
                })} */}
            </div>

        </div>
    );
}

export default MyTrips;
