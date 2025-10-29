'use client';

import React from 'react';
import { useDroneConfig } from '../context/DroneConfigContext';
import { LightBulbIcon, TagIcon, MapIcon, KeyIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'; 
import AppFooter from '../components/AppFooter';

const LightStatusBadge = ({ lightStatus }) => {
    const isLightOn = lightStatus && lightStatus.toLowerCase() === "on";

    const onClasses = "bg-gradient-to-r from-teal-500 to-cyan-600 shadow-xl shadow-teal-300/70";
    const offClasses = "bg-gradient-to-r from-gray-500 to-gray-600 shadow-lg shadow-gray-300/50";

    const colorClasses = isLightOn ? onClasses : offClasses;

    return (
        <span
            className={`px-6 py-2.5 text-base font-extrabold rounded-full text-white tracking-wider inline-flex items-center space-x-2 ${colorClasses} transition duration-300 transform hover:scale-[1.05]`}
        >
            {isLightOn ? (
                <CheckCircleIcon className="w-6 h-6 text-white" />
            ) : (
                <XCircleIcon className="w-6 h-6 text-white/70" />
            )}
            <span className="ml-2">
                {lightStatus ? lightStatus.toUpperCase() : "N/A"}
            </span>
        </span>
    );
};

const DataCard = ({ title, icon: IconComponent, value }) => (
    <div className="flex flex-col justify-between p-8 bg-white rounded-2xl border border-gray-100 shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-[1.01] cursor-default h-full">
        
        <span className="text-3xl font-extrabold text-gray-900 block truncate leading-snug mb-5">{value}</span>
        
        <div className="flex items-center space-x-4 pt-2 border-t border-gray-100/70">
            <IconComponent className="w-6 h-6 text-indigo-600" /> 
            <span className="font-semibold text-sm uppercase text-indigo-600 tracking-widest">{title}</span>
        </div>
    </div>
);


const ConfigPage = () => {
    const { config, isLoading, error, DRONE_ID } = useDroneConfig();

    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"; 

    if (isLoading)
        return (
            <div className="text-center py-40 bg-white min-h-screen">
                <p className={`text-4xl font-extrabold ${gradientTextClass} animate-pulse`}>
                    🛰️ Fetching Configuration...
                </p>
            </div>
        );

    if (error)
        return (
            <div className="text-center p-12 bg-red-50 border border-red-300 rounded-2xl shadow-xl shadow-red-100 max-w-xl mx-auto mt-20">
                <p className="font-extrabold text-3xl text-red-600">🚨 System Error</p>
                <p className="text-lg mt-3 text-red-500">{error}</p>
            </div>
        );
    if (!config)
        return (
            <div className="text-center p-12 bg-white shadow-2xl rounded-2xl max-w-xl mx-auto mt-20 border border-gray-100">
                <p className="text-2xl font-semibold text-gray-700">
                    🔍 Configuration Not Found
                </p>
                <p className="mt-2 text-gray-500">
                    Could not retrieve config data for Drone ID: {DRONE_ID}
                </p>
            </div>
        );

    return (
        <div className="py-12 md:py-10 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto">
                
                <header className="text-center mb-8"> 
                    <div className="flex flex-col items-center justify-center">
                        
                        <h1 className="text-5xl md:5text-xl font-extrabold mt-2 leading-tight">
                            <span className="text-gray-900">
                                Drone
                            </span>
                            <span className={`${gradientTextClass} ml-2`}>
                                Configuration
                            </span>
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 mt-2">
                        Drone ID: 
                        <span className=" font-mono font-semibold text-indigo-600 ml-1">
                            {config.drone_id}
                        </span>
                    </p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 p-6 md:p-8 bg-white/70 shadow-inner rounded-3xl border border-gray-100">
                    
                    <div className="flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-700 to-blue-600 rounded-2xl shadow-2xl shadow-indigo-400/50 transform transition duration-500 hover:scale-[1.02] cursor-default h-full">
                        <span className="font-mono text-3xl md:text-4xl font-extrabold text-white block truncate tracking-tight mb-5">{config.drone_id}</span>
                        
                        <div className="flex items-center space-x-4 pt-2 border-t border-white/30">
                            <KeyIcon className="w-6 h-6 text-white/80" /> 
                            <span className="font-bold text-sm uppercase text-white/80 tracking-widest">DRONE ID</span>
                        </div>
                    </div>
                    
                    <DataCard title="DRONE Name" icon={TagIcon} value={config.drone_name} />

                    <DataCard title="Country" icon={MapIcon} value={config.country} />

                    <div className="flex flex-col justify-between p-8 bg-white rounded-2xl border border-gray-100 shadow-lg transform transition duration-300 hover:shadow-xl hover:scale-[1.01] cursor-default h-full">
                        <div className="mb-5">
                            <LightStatusBadge lightStatus={config.light} />
                        </div>
                        
                        <div className="flex items-center space-x-4 pt-2 border-t border-gray-100/70">
                            <LightBulbIcon className="w-6 h-6 text-indigo-600" />
                            <span className="font-semibold text-sm uppercase text-indigo-600 tracking-widest">LIGHT STATUS</span>
                        </div>
                    </div>

                </div>

                <AppFooter/>
            </div>
        </div>
    );
};

export default ConfigPage;
