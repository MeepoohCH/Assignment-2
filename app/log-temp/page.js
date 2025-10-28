'use client'; 

import React, { useState, useEffect } from 'react';
import { useDroneConfig } from '../context/DroneConfigContext';

const TempLogFormPage = () => {
    const { config, isLoading, error, DRONE_ID, API_URL } = useDroneConfig();
    
    const [celsius, setCelsius] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    // 1. การจัดการสถานะการโหลดและข้อผิดพลาด
    if (isLoading) {
        return (
            <div className="text-center p-8 text-lg font-medium text-indigo-600">
                <p>กำลังเตรียมฟอร์ม (โหลด Config)...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-500 bg-red-100 border border-red-400 rounded-lg">
                <p className="font-bold">❌ Error Loading Config:</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }
    
    if (!config) {
        return (
            <div className="text-center p-8 text-red-500">
                <p>ไม่สามารถโหลดข้อมูล Drone Config สำหรับ Drone ID: {DRONE_ID} ได้</p>
                <p className="text-sm mt-2">โปรดตรวจสอบว่า API Server ทำงานและ DRONE_ID ถูกต้อง</p>
            </div>
        );
    }

    // 2. ฟังก์ชัน Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // เคลียร์ข้อความก่อนหน้า
        setIsSubmitting(true);
        
        // Payload ที่ต้องใช้: drone_id, drone_name, country (จาก config) และ celsius (จาก form)
        const payload = {
            drone_id: config.drone_id,
            drone_name: config.drone_name,
            country: config.country,
            celsius: parseFloat(celsius), 
        };

        try {
            const response = await fetch(`${API_URL}/logs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.status === 201) {
                setMessage('✅ บันทึก Log อุณหภูมิสำเร็จแล้ว!');
                setCelsius(''); // เคลียร์ form
            } else {
                // สำหรับ Error อื่นๆ (เช่น 400 Bad Request)
                const errorData = await response.json();
                setMessage(`❌ ส่ง Log ล้มเหลว: ${errorData.message || response.statusText}`);
            }
        } catch (submitError) {
            setMessage(`❌ Network Error: ${submitError.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

   
    // 3. UI/Form Component
    return (
        <div className="p-8 max-w-lg mx-auto bg-white shadow-2xl rounded-xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-indigo-200 pb-3">
                🌡️ บันทึกอุณหภูมิ (Log Form)
            </h2>
            
            <div className="mb-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 text-indigo-800 rounded-md">
                <p className="font-semibold">กำลังบันทึก Log สำหรับ:</p>
                <p className="text-sm mt-1">
                    **{config.drone_name}** (ID: {config.drone_id}) จาก {config.country}
                </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <label className="block">
                    <span className="text-gray-700 font-medium text-lg">ป้อนอุณหภูมิ (°C):</span>
                    <input
                        type="number"
                        step="0.1"
                        value={celsius}
                        onChange={(e) => setCelsius(e.target.value)}
                        required
                        min="-100" // กำหนด min/max เพื่อป้องกัน input ที่ไม่สมเหตุสมผล
                        max="200"
                        className="mt-2 block w-full rounded-lg border-gray-300 shadow-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-3 text-2xl font-mono transition duration-150"
                        placeholder="เช่น 35.5"
                        disabled={isSubmitting}
                    />
                </label>
                
                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg shadow-xl text-xl font-bold text-white transition duration-200 ease-in-out ${
                        isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300'
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? '...กำลังส่งข้อมูล...' : 'Submit Data'}
                </button>
            </form>

            {/* แสดงสถานะการส่งข้อมูล */}
            {message && (
                <div className={`mt-6 p-4 rounded-lg text-lg font-semibold ${
                    message.startsWith('✅') ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'
                } border`}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default TempLogFormPage;