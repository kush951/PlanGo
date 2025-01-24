import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/view-trip/components/Footer';

function Hero() {
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 gap-6 md:gap-9">
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-center mt-8 sm:mt-12">
                <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span>
                <br />
                Personalized Itineraries at Your Fingertips
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-500 text-center">
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to={'/create-trip'}>
                <Button>Get Started, It's Free</Button>
            </Link>

            <img
                src="/landing.png"
                alt="landing img"
                className="mt-6 sm:mt-8 w-full h-auto object-cover max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl"
            />
            <Footer />
        </div>
    );
}

export default Hero;
