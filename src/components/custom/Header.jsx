import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => getUserProfile(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    const getUserProfile = async (tokenInfo) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${tokenInfo?.access_token}`,
                        Accept: 'Application/json',
                    },
                }
            );
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            toast.success('Signed in successfully!');
        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Failed to sign in. Please try again.');
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        setUser(null);
        toast('You have been signed out.');
        window.location.reload();
    };

    return (
        <div className="p-3 shadow-sm flex flex-wrap justify-between items-center px-4 md:px-5">
            <a href="/" className="flex-shrink-0">
                <img src="/logo.svg" alt="logo" className="h-8 md:h-10" />
            </a>

            <div className="mt-2 md:mt-0 flex flex-wrap items-center gap-2 md:gap-4">
                {user ? (
                    <div className="flex flex-wrap items-center gap-2 md:gap-4">
                        <span className="text-sm md:text-base font-medium">
                            Hi, {user.name}
                        </span>
                        <Button
                            variant="outline"
                            onClick={handleSignOut}
                            className="text-xs md:text-sm"
                        >
                            Sign Out
                        </Button>
                        <a href="/create-trip">
                            <Button
                                variant="outline"
                                className="text-xs md:text-sm rounded-full"
                            >
                                + Create Trip
                            </Button>
                        </a>
                        <a href="/my-trips">
                            <Button
                                variant="outline"
                                className="text-xs md:text-sm rounded-full"
                            >
                                My Trips
                            </Button>
                        </a>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        onClick={() => login()}
                        className="flex items-center text-xs md:text-sm"
                    >
                        <FcGoogle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;
