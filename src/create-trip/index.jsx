import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SelectTravelesList, SelectBudgetOptions, AI_PROMPT } from "../constants/options";
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { chatSession } from "@/service/AiModel";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '@/service/firebaseConfig';
import { useNavigate } from "react-router-dom";
import Footer from '@/view-trip/components/Footer';

function CreateTrip() {
    const [query, setQuery] = useState(""); // Holds the input value for search
    const [results, setResults] = useState([]); // Holds the search results
    const [destination, setDestination] = useState(""); // Holds the selected destination
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState(null);

    // Log destination whenever it changes
    useEffect(() => {
        if (destination) {
            console.log("Selected Destination:", destination);
        }
    }, [destination]);

    // Fetch suggestions from Nominatim API
    const handleSearch = async (e) => {
        const searchTerm = e.target.value;
        setQuery(searchTerm);

        if (searchTerm.length > 2) { // Fetch only if input length > 2
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchTerm}`
            );
            const data = await response.json();
            setResults(data);
        } else {
            setResults([]); // Clear suggestions if input is too short
        }
    };

    // Handle selection of a place
    const handleSelect = (place) => {
        setQuery(place.display_name); // Set the selected place as input value
        setResults([]); // Clear suggestions after selection
        setDestination(place.display_name); // Update the destination state
        handleInputChange('destination', place.display_name); // Update formData
    };

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeRep) => GetUserProfile(codeRep),
        onError: (error) => console.log(error),
    });

    const SaveAiTrip = async (TripData) => {
        let docId = null; // Ensure docId is defined outside the try block
        try {
            setLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            docId = Date.now().toString(); // Assign a unique ID

            // Save to Firestore
            await setDoc(doc(db, "AITrips", docId), {
                userSelection: formData,
                tripData: JSON.parse(TripData),
                userEmail: user?.email,
                id: docId,
            });

            console.log("Trip saved successfully!");
            toast.success("Trip saved successfully!");
        } catch (error) {
            console.error("Error saving trip:", error);
            toast.error("Failed to save the trip. Please try again.");
        } finally {
            setLoading(false);
            if (docId) {
                navigate(`/view-trip/${docId}`); // Navigate only if docId was successfully defined
            }
        }
    };


    const OnGenerateTrip = async () => {
        if (!user) {
            setOpenDialog(true);
            return;
        }

        const days = parseInt(formData?.noOfDays, 10);

        if (!days || days > 5 || !formData?.destination || !formData?.budget || !formData?.traveler) {
            toast("Please fill all details");
            return;
        }

        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace("{destination}", formData?.destination)
            .replace("{totalDays}", days)
            .replace("{traveler}", formData?.traveler)
            .replace("{budget}", formData?.budget);

        try {
            const result = await chatSession.sendMessage(FINAL_PROMPT);
            console.log("--", result?.response?.text());
            await SaveAiTrip(result?.response?.text());
            toast.success("Trip generated successfully!");
        } catch (error) {
            console.error("Error generating trip:", error);
            toast.error("Failed to generate the trip. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const GetUserProfile = (tokenInfo) => {
        axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenInfo?.access_token}`,
                    Accept: "Application/json",
                },
            })
            .then((resp) => {
                console.log(resp);
                localStorage.setItem("user", JSON.stringify(resp.data));
                setUser(resp.data);
                console.log("Closing dialog"); // Add this line
                setOpenDialog(false); // Close the dialog
                OnGenerateTrip(); // Continue with trip generation
            })
            .catch((error) => {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to sign in. Please try again.");
            });
    };

    const handleSignOut = () => {
        localStorage.removeItem("user");
        setUser(null);
        toast("You have been signed out.");

    };

    const navigate = useNavigate();
    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Provide basic information, and our trip planner will generate a customized itinerary.
            </p>

            <div className="mt-20">
                <h2 className="text-xl my-3 font-medium rounded-xl">Destination?</h2>
                <div>
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearch}
                        placeholder="Search for a destination..."
                        className="border px-3 py-2 w-full"
                    />
                    {results.length > 0 && (
                        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto">
                            {results.map((result) => (
                                <li
                                    key={result.place_id}
                                    className="p-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(result)}
                                >
                                    {result.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <br />
            <div>
                <h2 className="text-xl my-3 font-medium">How many days are you planning to stay?</h2>
                <Input
                    placeholder="Ex. 3"
                    type="number"
                    onChange={(e) => handleInputChange("noOfDays", e.target.value)}
                />
            </div>

            <br />
            <div>
                <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
                    {SelectBudgetOptions.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange("budget", item.title)}
                            className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData?.budget === item.title && "shadow-lg border-black"
                                }`}
                        >
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <br />
            <div>
                <h2 className="text-xl my-3 font-medium">Who do you want to travel with?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5 ">
                    {SelectTravelesList.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleInputChange("traveler", item.title)}
                            className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData?.traveler === item.title && "shadow-lg border-black"
                                }`}
                        >
                            <h2 className="text-4xl">{item.icon}</h2>
                            <h2 className="font-bold text-lg">{item.title}</h2>
                            <h2 className="text-sm text-gray-500">{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button disabled={loading} onClick={OnGenerateTrip}>
                    {loading ? (
                        <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                    ) : (
                        "Generate Trip"
                    )}
                </Button>
            </div>

            {user && (
                <div className="my-10 justify-end flex">
                    <Button onClick={handleSignOut}>Sign Out</Button>
                </div>
            )}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            You need to sign in to generate a trip.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="justify-center flex flex-col items-center mt-4">
                        <Button onClick={() => login()} variant="outline">
                            <FcGoogle className="h-7 w-7 mr-2" />
                            Sign in with Google
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}

export default CreateTrip;