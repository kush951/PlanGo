import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


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
        <div className="p-3 shadow-sm flex justify-between items-center px-5">
            <img src="/logo.svg" alt="logo" />

            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Hi, {user.name}</span>
                        <Button variant="outline" onClick={handleSignOut}>
                            Sign Out
                        </Button>

                        <a href="/my-trips">
                            <Button variant="outline" className="rounded-full">
                                My Trip
                            </Button>
                        </a>

                    </div>
                ) : (
                    <Button variant="outline" onClick={() => login()}>
                        <FcGoogle className="h-5 w-5 mr-2" />
                        Sign In
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;