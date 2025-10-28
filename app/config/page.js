'use client'; 

import React from 'react';
import { useDroneConfig } from '../context/DroneConfigContext';
const ConfigPage = () => {

    const { config, isLoading, error, DRONE_ID } = useDroneConfig();

    if (isLoading) return <div className="text-center p-8">กำลังโหลดข้อมูล Config...</div>;
    
    if (error) return <div className="text-center p-8 text-red-500">❌ เกิดข้อผิดพลาดในการโหลด Config: {error}</div>;

    if (!config) return <div className="text-center p-8 text-red-500">ไม่พบข้อมูล Config สำหรับ Drone ID: {DRONE_ID}</div>;

    return (
        <div className="p-8 max-w-xl mx-auto bg-white shadow-xl rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">🛸 Drone Configuration (ID: {DRONE_ID})</h2>
            <div className="space-y-4">
                {/* แสดงผล Drone ID */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-semibold text-gray-600">Drone ID:</span>
                    <span className="font-mono text-xl text-blue-600">{config.drone_id}</span>
                </div>
                {/* แสดงผล Drone Name */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-semibold text-gray-600">Drone Name:</span>
                    <span className="text-gray-900 font-medium">{config.drone_name}</span>
                </div>
                {/* แสดงผล Light */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-semibold text-gray-600">Light Status:</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${config.light === 'on' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {config.light.toUpperCase()}
                    </span>
                </div>
                {/* แสดงผล Country */}
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                    <span className="font-semibold text-gray-600">Country:</span>
                    <span className="text-gray-900">{config.country}</span>
                </div>
            </div>
        </div>
    );
};

export default ConfigPage;