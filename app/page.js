import NavCard from "./components/NavCard"; 
import { Cog8ToothIcon, DocumentTextIcon, FireIcon, ThermometerIcon } from '@heroicons/react/24/outline'; 
import React from 'react';
import AppFooter from "./components/AppFooter";
import SVGComponent from "./components/Thermometer";

const DRONE_ID = process.env.NEXT_PUBLIC_DRONE_ID || 'N/A'; 

export default function HomePage() {
    
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500";
    
    // Data Structure: Concise and focused on access
    const moduleCards = [
        {
            href: "/config",
            title: "1. Configuration Settings",
            description: "Access and verify primary drone settings, including Name, Light Status, and Country of Operation. Data available via Context.",
            icon: <Cog8ToothIcon />,
            link: "View Config"
        },
        {
            href: "/log-temp",
            title: "2. Temperature Data Input",
            description: "Dedicated interface for submitting new temperature readings (Celsius) using the POST /logs API endpoint.",
            icon: <SVGComponent />,
            link: "Input Temperature"
        },
        {
            href: "/logs",
            title: "3. Historical Data Viewer",
            description: "Review comprehensive log history for this Device ID. Features efficient data display with table pagination.",
            icon: <DocumentTextIcon />,
            link: "View Logs"
        },
    ];
    
    return (
        <div className="py-10 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)] bg-gray-50">
            <header className="max-w-5xl mx-auto text-center mb-12"> 
                
                
                <p className="text-base font-semibold text-gray-500 uppercase mb-3 tracking-widest">
                    WELCOME TO
                </p>
                
                {/* Headline*/}
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                    <span className={`${gradientTextClass} block`}>
                        DRONE MANAGEMENT SYSTEM
                    </span>
                </h1>
                
                {/* Sub-Headline: Console Access */}
                <p className="text-xl text-gray-600 mt-6">
                    Managing Drone ID: 
                    <span 
                        className="font-mono text-indigo-700 font-extrabold ml-1 drop-shadow-sm transition-colors duration-300 hover:text-blue-600"
                    >
                        {DRONE_ID}
                    </span>
                </p>
                
            </header>

            {/* --- Main Navigation Grid --- */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {moduleCards.map((card) => (
                    <NavCard
                        key={card.href}
                        href={card.href}
                        title={card.title}
                        description={card.description}
                        icon={card.icon}
                        link = {card.link}
                    />
                ))}
            </div>
            
            <AppFooter/>
        </div>
    );
}
