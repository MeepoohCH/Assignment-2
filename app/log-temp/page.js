'use client';

import React, { useState } from 'react';
import { useDroneConfig } from '../context/DroneConfigContext';
import { ArrowPathIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'; // Import Heroicons
import AppFooter from '../components/AppFooter';

export default function LogTempPage() {
    const { config, isLoading, error, API_URL, DRONE_ID } = useDroneConfig();
    const [celsius, setCelsius] = useState('');
    const [status, setStatus] = useState(''); // 'success', 'error', 'loading'

    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"; 
    const gradientButtonClass = "bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600";

    if (isLoading) return (
        <div className="text-center py-40 bg-white min-h-screen">
            <p className="text-4xl font-extrabold text-indigo-600 animate-pulse flex items-center justify-center space-x-3">
                <ArrowPathIcon className="w-8 h-8"/> <span>Fetching Configuration...</span>
            </p>
        </div>
    );
    
    if (error || !config) return <div className="text-center p-10 text-xl text-red-600">Error: Cannot load drone configuration.</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const temp = parseFloat(celsius);
        if (isNaN(temp)) {
            setStatus('error: Please enter a valid numerical temperature.');
            return;
        }
        if (temp < -50 || temp > 100) {
            setStatus('error: Temperature seems out of a normal range (-50°C to 100°C).');
            return;
        }

        setStatus('loading');
        
        try {
            const logData = {
                drone_id: DRONE_ID,
                drone_name: config.drone_name,
                country: config.country,
                celsius: temp
            };

            const response = await fetch(`${API_URL}/logs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API failed: ${errorData.message || response.statusText}`);
            }

            setStatus('success');
            setCelsius(''); 
        } catch (err) {
            console.error('Log submission error:', err);
            setStatus(`error: Failed to submit log. ${err.message}`);
        }
    };

    return (
        <div className="py-12 md:py-10 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl shadow-indigo-100/70 rounded-3xl border border-gray-100">
                
                <header className="text-center mb-8 border-b pb-4">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        <span className={`${gradientTextClass}`}>
                            Sensor Data Input
                        </span>
                    </h1>
                    <p className="mt-2 text-gray-500 text-base">
                        Logging temperature for <strong>{config.drone_name}</strong> 
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="p-4 bg-indigo-50 rounded-xl text-sm font-medium text-gray-700 border-l-4 border-indigo-400 flex justify-between">
                        <p>Drone ID: <span className="font-mono font-bold text-indigo-700">{DRONE_ID}</span></p>
                        <p>Country: <span className="text-indigo-700 font-bold">{config.country}</span></p>
                    </div>
                    <div>
                        <label htmlFor="celsius" className="block text-base font-bold text-gray-700 mb-2">
                            Temperature (Celsius ºC)
                        </label>
                        <input
                            id="celsius"
                            type="number"
                            step="0.1"
                            value={celsius}
                            onChange={(e) => setCelsius(e.target.value)}
                            required
                            className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 text-xl"
                            placeholder="Enter value e.g. 25.5"
                            disabled={status === 'loading'}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full py-3 rounded-xl text-white font-extrabold text-lg transition duration-300 shadow-xl flex items-center justify-center space-x-2
                            ${status === 'loading' 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : `${gradientButtonClass} hover:shadow-2xl`}`
                        }
                    >
                        {status === 'loading' ? (
                            <>
                                <ArrowPathIcon className="w-5 h-5 animate-spin" /> <span>Submitting Data...</span>
                            </>
                        ) : 'Submit'}
                    </button>
                </form>

                {/* Status Message */}
                {status === 'success' && (
                    <div className="mt-6 p-4 rounded-xl bg-green-100 text-green-700 font-bold border border-green-300 shadow-md flex items-center space-x-2">
                        <CheckCircleIcon className="w-5 h-5" /> <span>Log submitted successfully!</span>
                    </div>
                )}
                {status.startsWith('error') && (
                    <div className="mt-6 p-4 rounded-xl bg-red-100 text-red-700 font-bold border border-red-300 shadow-md flex items-center space-x-2">
                        <ExclamationCircleIcon className="w-5 h-5" /> <span>{status.replace('error: ', 'Submission Failed: ')}</span>
                    </div>
                )}
            </div>
            <AppFooter/>
        </div>
    );
}
