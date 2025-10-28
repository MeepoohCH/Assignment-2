'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const DRONE_ID = process.env.NEXT_PUBLIC_DRONE_ID ;
const API_URL = process.env.NEXT_PUBLIC_API_URL ;

// 1. สร้าง Context
const DroneConfigContext = createContext();

// 2. สร้าง Hook เพื่อให้ Components อื่นเรียกใช้
export const useDroneConfig = () => {
    return useContext(DroneConfigContext);
};

// 3. สร้าง Provider Component
export const DroneConfigProvider = ({ children }) => {
    const [config, setConfig] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch(`${API_URL}/configs/${DRONE_ID}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch config. Status: ${response.status}`);
                }
                const data = await response.json();
                setConfig(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching drone config:', err.message);
                setError(err.message);
                setConfig(null); 
            } finally {
                setIsLoading(false);
            }
        };
        fetchConfig();
    }, []); 
    const value = {
        config,
        isLoading,
        error,
        DRONE_ID,
        API_URL,
        // (Optional) หากต้องการให้ Page #2/3 อัปเดต config ได้
        setConfig 
    };

    return (
        <DroneConfigContext.Provider value={value}>
            {children}
        </DroneConfigContext.Provider>
    );
};