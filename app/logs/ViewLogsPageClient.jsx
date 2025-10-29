'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDroneConfig } from '../context/DroneConfigContext';
import { ArrowPathIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'; 
import AppFooter from '../components/AppFooter';
const getCelsiusColor = (celsius) => {
    // Defines color tones for temperature readability (remains consistent)
    if (celsius >= 35) return 'text-red-700 bg-red-100 font-bold'; 
    if (celsius >= 28) return 'text-orange-600 bg-orange-100 font-semibold'; 
    if (celsius >= 20) return 'text-green-700 bg-green-100 font-medium'; 
    if (celsius >= 10) return 'text-blue-600 bg-blue-100 font-semibold'; 
    return 'text-cyan-700 bg-cyan-100 font-bold';
};

// --- Main Page Component ---
const ViewLogsPage = () => {
    const { DRONE_ID, API_URL } = useDroneConfig(); 
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    
    const [logData, setLogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // New Gradient Theme: Indigo/Blue
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500"; 

    // Fetch Logs Logic
    useEffect(() => {
        if (!DRONE_ID || !API_URL) {
            setError("Configuration missing (DRONE_ID or API_URL).");
            setIsLoading(false);
            return;
        }

        const fetchLogs = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_URL}/logs/${DRONE_ID}?page=${currentPage}`); 
                
                if (response.status === 404) {
                    setLogData({ data: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, navigation: {} } });
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch logs. Status: ${response.status}`);
                }
                
                const data = await response.json();
                setLogData(data);
            } catch (err) {
                setError(`Failed to load logs: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, [DRONE_ID, API_URL, currentPage]);

    const getPageQuery = (url) => url ? url.split('?')[1] : null;

    // Error & Loading UI (Indigo Accent)
    if (isLoading) {
        return (
            <div className="text-center py-40 bg-white min-h-screen">
                <p className="text-4xl font-extrabold text-indigo-600 animate-pulse flex items-center justify-center space-x-2">
                    <ArrowPathIcon className="w-8 h-8"/> <span>Retrieving Log Archive...</span>
                </p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center p-12 text-red-500 bg-red-100 border border-red-400 rounded-2xl max-w-xl mx-auto mt-20 flex items-center space-x-2 justify-center">
                <ExclamationCircleIcon className="w-6 h-6"/> <p className="font-bold">Error Loading Logs.</p>
            </div>
        );
    }

    if (!logData || !logData.data || logData.data.length === 0) {
        return (
            <div className="text-center p-12 text-gray-500 bg-white shadow-xl rounded-2xl max-w-xl mx-auto mt-20 border border-gray-100">
                <p className="text-2xl font-semibold">🔍 No Log Records Found</p>
                <p className="mt-2">for Device ID: {DRONE_ID}</p>
            </div>
        );
    }
    
    const logs = logData.data;
    const pagination = logData.pagination || { currentPage: 1, totalPages: 1, totalItems: logs.length, navigation: {} };
    const { first, prev, next, last } = pagination.navigation || {};

    // --- Main UI (Clean, Readable, Modern) ---
    return (
        <div className="py-12 md:py-2 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto p-6 md:p-8 bg-white shadow-3xl shadow-indigo-100/60 rounded-2xl border border-gray-100">
                <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
                    <span className="text-gray-900">Historical</span>
                    <span className={`${gradientTextClass} ml-2`}>Archive</span>
                </h2>
                <p className="mb-6 text-gray-600">Viewing logs for <strong>Drone ID: {DRONE_ID}.</strong> Total records: {pagination.totalItems}.</p>
                <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-indigo-50"> 
                            <tr>
                                {['Created', 'Country', 'Drone ID', 'Drone Name', 'Celsius'].map(header => (
                                    <th key={header} className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {logs.map((log, index) => (
                                <tr key={log.id || index} className={index % 2 === 0 ? 'hover:bg-indigo-50' : 'bg-gray-50 hover:bg-indigo-100/70'}>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {new Date(log.created).toLocaleTimeString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                    {/* Country */}
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{log.country}</td>
                                    {/* Drone ID (Indigo Accent) */}
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-indigo-600 font-mono font-bold">{log.drone_id}</td>
                                    {/* Drone Name */}
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{log.drone_name}</td>
                                    
                                    {/* Celsius - Use Badge and Color Coding */}
                                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                                        <span className={`px-3 py-1 inline-flex text-sm leading-5 rounded-full ${getCelsiusColor(log.celsius)}`}>
                                            {log.celsius}°C
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Navigation (Simplified and Modern) */}
                <div className="mt-8 flex justify-between items-center border-t pt-6">
                    <div>
                        <span className="text-sm text-gray-700 font-medium">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                    </div>
                    
                    <nav className="relative z-0 inline-flex rounded-xl" aria-label="Pagination">
                        {[
                            { label: 'First', url: first },
                            { label: 'Previous', url: prev },
                            { label: 'Next', url: next },
                            { label: 'Last', url: last }
                        ].map((item) => {
                            const isDisabled = !item.url;
                            const buttonClasses = `
                                relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-lg ml-3 transition duration-300 shadow-md
                                ${isDisabled 
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Disabled: Flat, muted look
                                    : 'bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600' // Enabled: Gradient
                                }
                            `;

                            return (
                                <Link 
                                    key={item.label}
                                    href={isDisabled ? '#' : `/logs?${getPageQuery(item.url)}`}
                                    className={buttonClasses}
                                    aria-disabled={isDisabled}
                                    tabIndex={isDisabled ? -1 : undefined}
                                >
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>    
           <AppFooter/>
        </div>
    );
};

export default ViewLogsPage;
