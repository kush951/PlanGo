import React, { useEffect, useState } from 'react'; // Added useState import
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../components/InfoSection';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]); // Corrected the state variable name from 'tript' to 'trip'

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document", docSnap.data());
            setTrip(docSnap.data());
        } else {
            console.log("No such Document");
            toast("No trip Found");
        }
    };

    useEffect(() => {
        tripId && GetTripData();
    }, [tripId]);

    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            {/* Daily Plan */}
        </div>
    );
}

export default Viewtrip;
