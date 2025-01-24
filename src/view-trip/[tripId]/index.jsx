import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null); // Set initial state to null

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
        if (tripId) {
            GetTripData();
        }
    }, [tripId]);

    if (!trip) {
        return <p>Loading...</p>; // Show loading state while fetching data
    }

    return (
        <div className='p-4 sm:p-6 md:p-10 lg:px-20 xl:px-44 2xl:px-56'>
            {/* Information Section */}
            <InfoSection trip={trip} />
            {/* Recommended Hotels */}
            <Hotels trip={trip} />
            {/* Daily Plan */}
            <PlacesToVisit trip={trip} />
            {/* Footer */}
            <Footer trip={trip} />
        </div>
    );
}

export default Viewtrip;