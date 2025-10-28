'use client';

import Link from 'next/link';
import React from 'react';

const NavCard = ({ href, title, description, icon }) => {
    
    // Gradient Color: Indigo/Blue
    const GRADIENT_COLOR = 'linear-gradient(135deg, #4f46e5, #3b82f6)'; // Indigo-600 to Blue-500

    // 1. คลาสสำหรับการยกตัวและการเน้นขอบเมื่อ Hover
    const hoverClass = "transform hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 ease-out";
    
    // 2. คลาสหลักของ Card: Clean White, Rounded, Soft Shadow
    const cardClass = `bg-white rounded-2xl p-6 shadow-2xl shadow-gray-200/50 ${hoverClass} h-full flex flex-col group relative overflow-hidden`;
                      
    // Gradient Accent Bar ด้านบน (Indigo/Blue Accent)
    const accentBarClass = "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

    // Icon Ring: สร้างมิติ 3D ด้วย Shadow และ Indigo/Blue Gradient
    const iconRingStyle = {
        width: '88px',
        height: '88px',
        // ใช้ Indigo/Blue Gradient
        background: GRADIENT_COLOR, 
        padding: '3px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    };
    
    // Icon Wrapper Class: นำ Icon เข้ามาไว้ใน Content Space
    const iconWrapperClass = "flex justify-center mb-6 pt-2"; 

    return (
        <Link href={href} className="block h-full">
            <div className={cardClass}>
                
                {/* 1. Artistic Accent Bar */}
                <div className={accentBarClass}></div>
                
                {/* 2. Icon Section: Fully Integrated and Elegant */}
                <div className={iconWrapperClass}>
                    <div style={iconRingStyle}>
                        {/* Inner Circle: สีขาวสะอาดตา */}
                        <div className="w-[82px] h-[82px] bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
                            {/* Icon Clone: ขนาดเหมาะสมกับวงกลม และใช้สี Indigo เข้ม */}
                            {icon && React.cloneElement(icon, { className: 'w-8 h-8 text-indigo-700' })}
                        </div>
                    </div>
                </div>

                {/* 3. Content Section: Organized and Spacious */}
                <div className="flex flex-col h-full text-center">
                    
                    <h2 className="text-xl font-extrabold mb-2 text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors duration-200">
                        {title}
                    </h2>
                    
                    <p className="text-base text-gray-500 flex-grow mb-4 leading-relaxed">
                        {description}
                    </p>

                    {/* 4. Action Link: Clear and Animated Micro-Interaction (Indigo Accent) */}
                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="text-sm font-bold text-indigo-600 group-hover:text-blue-600 transition-colors duration-200 flex items-center justify-center">
                            Launch Module 
                            <svg 
                                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NavCard;
