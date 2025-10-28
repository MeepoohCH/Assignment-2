// src/app/logs/page.js
'use client'; 
// กำหนดให้เป็น Client Component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDroneConfig } from '../context/DroneConfigContext'; // ดึง Global State

/// Helper Function: กำหนดสีตามค่าอุณหภูมิ
const getCelsiusColor = (celsius) => {
    // โทนสีร้อน (Red/Orange/Yellow)
    if (celsius >= 40) return 'text-red-700 bg-red-100 font-bold'; // ร้อนจัด
    if (celsius >= 30) return 'text-orange-600 bg-orange-100 font-semibold'; // ร้อน
    if (celsius >= 25) return 'text-yellow-600 bg-yellow-100 font-medium'; // อุ่น

    // โทนสีกลาง/เย็น (Green/Blue)
    if (celsius >= 15) return 'text-green-700 bg-green-100 font-medium'; // เย็นสบาย
    if (celsius >= 0) return 'text-blue-600 bg-blue-100 font-semibold'; // เย็น
    
    // โทนสีหนาวเย็น (Dark Blue/Cyan)
    return 'text-cyan-700 bg-cyan-100 font-bold'; // หนาวจัด/ติดลบ
};


// ----------------------------------------------------------------
// 1. Log Table Component
// ----------------------------------------------------------------
const ViewLogsPage = () => {
    const { DRONE_ID, API_URL } = useDroneConfig(); 

    const searchParams = useSearchParams();
    const page = searchParams.get('page') || 1; 
    
    const [logData, setLogData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
                const response = await fetch(`${API_URL}/logs/${DRONE_ID}?page=${page}`);
                
                if (response.status === 404) {
                    setLogData({ data: [], pagination: {} });
                    return;
                }
                if (!response.ok) {
                    throw new Error(`Failed to fetch logs. Status: ${response.status}`);
                }
                
                const data = await response.json();
                setLogData(data);
            } catch (err) {
                console.error('Error fetching logs:', err);
                setError(`Failed to load logs: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, [DRONE_ID, API_URL, page]);

    // ----------------------------------------------------------------
    // 2. การจัดการสถานะการโหลดและข้อผิดพลาด
    // ----------------------------------------------------------------
    if (isLoading) {
        return <div className="text-center p-8 text-lg font-medium text-indigo-600">กำลังโหลด Log ล่าสุด...</div>;
    }
    
    if (error) {
        return (
            <div className="text-center p-8 text-red-500 bg-red-100 border border-red-400 rounded-lg">
                <p className="font-bold">❌ Error Loading Logs:</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (!logData || !logData.data || logData.data.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500 bg-white shadow-lg rounded-lg">
                <p className="text-xl font-semibold">🔍 ไม่พบข้อมูล Log</p>
                <p className="mt-2">สำหรับ Drone ID: {DRONE_ID}</p>
            </div>
        );
    }
    
    const logs = logData.data;
    const pagination = logData.pagination;
    const { first, prev, next, last } = pagination.navigation;

    const getPageQuery = (url) => url ? url.split('?')[1] : null;

    // ----------------------------------------------------------------
    // 3. UI/ตารางแสดงผล
    // ----------------------------------------------------------------
    return (
        <div className="p-8 max-w-7xl mx-auto bg-white shadow-2xl rounded-xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-3">
                📜 รายการ Log (Drone ID: {DRONE_ID})
            </h2>
            <p className="mb-6 text-gray-600">แสดง {logs.length} รายการ (ล่าสุด 12 รายการต่อหน้า). รวม: {pagination.totalItems} รายการ.</p>

            {/* Log Table */}
            <div className="overflow-x-auto shadow-xl rounded-lg border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-indigo-600">
                        <tr>
                            {['Created', 'Country', 'Drone ID', 'Drone Name', 'Celsius'].map(header => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {logs.map((log, index) => (
                            <tr key={log.id || index} className={index % 2 === 0 ? 'hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                                {/* Created */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {new Date(log.created).toLocaleString('th-TH')}
                                </td>
                                {/* Country */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.country}</td>
                                {/* Drone ID */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-mono font-semibold">{log.drone_id}</td>
                                {/* Drone Name */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.drone_name}</td>
                                
                                {/* Celsius - ใช้สีตามอุณหภูมิ */}
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-3 py-1 inline-flex text-sm leading-5 rounded-full ${getCelsiusColor(log.celsius)}`}>
                                        {log.celsius}°C
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Navigation */}
            <div className="mt-8 flex justify-between items-center border-t pt-4">
                <div>
                    <span className="text-sm text-gray-700">
                        หน้า {pagination.currentPage} จาก {pagination.totalPages}
                    </span>
                </div>
                
                <nav className="relative z-0 inline-flex rounded-md shadow-lg -space-x-px" aria-label="Pagination">
                    {/* First Page */}
                    <Link 
                        href={`/logs?${getPageQuery(first)}`} 
                        className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium transition ${!first ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                        aria-disabled={!first}
                        tabIndex={!first ? -1 : undefined}
                    >
                        <span>« แรก</span>
                    </Link>
                    
                    {/* Previous Page */}
                    <Link 
                        href={`/logs?${getPageQuery(prev)}`} 
                        className={`relative inline-flex items-center px-4 py-2 border-y border-gray-300 text-sm font-medium transition ${!prev ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                        aria-disabled={!prev}
                        tabIndex={!prev ? -1 : undefined}
                    >
                        <span>‹ ก่อนหน้า</span>
                    </Link>
                    
                    {/* Next Page */}
                    <Link 
                        href={`/logs?${getPageQuery(next)}`} 
                        className={`relative inline-flex items-center px-4 py-2 border-y border-gray-300 text-sm font-medium transition ${!next ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                        aria-disabled={!next}
                        tabIndex={!next ? -1 : undefined}
                    >
                        <span>ถัดไป ›</span>
                    </Link>

                    {/* Last Page */}
                    <Link 
                        href={`/logs?${getPageQuery(last)}`} 
                        className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium transition ${!last ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'}`}
                        aria-disabled={!last}
                        tabIndex={!last ? -1 : undefined}
                    >
                        <span>สุดท้าย »</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default ViewLogsPage;