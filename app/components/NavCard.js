'use client';

import Link from 'next/link';
import React from 'react';

const NavCard = ({ href, title, description, icon, link }) => {
    
    const GRADIENT_COLOR = 'linear-gradient(135deg, #4f46e5, #3b82f6)';

    const hoverClass = "transform hover:-translate-y-0.5 hover:shadow-3xl hover:shadow-indigo-200/50 transition-all duration-300 ease-out"; 

    const cardClass = `bg-white rounded-2xl p-6 shadow-2xl shadow-gray-300/50 ${hoverClass} h-full flex flex-col group relative overflow-hidden`;
                      
    const accentBarClass = "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

    const iconRingStyle = {
        width: '88px',
        height: '88px',
        background: GRADIENT_COLOR, 
        padding: '3px',
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
    };
    
    const iconWrapperClass = "flex justify-center mb-6 pt-2"; 

    return (
        <Link href={href} className="block h-full">
            <div className={cardClass}>
                
                <div className={accentBarClass}></div>
                
                <div className={iconWrapperClass}>
                    <div style={iconRingStyle}>
                        <div className="w-[82px] h-[82px] bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-inner">
                            {icon && React.cloneElement(icon, { className: 'w-8 h-8 text-indigo-700' })}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col h-full text-center">
                    
                    <h2 className="text-xl font-extrabold mb-2 text-gray-900 tracking-tight group-hover:text-indigo-700 transition-colors duration-200">
                        {title}
                    </h2>
                    
                    <p className="text-base text-gray-500 flex-grow mb-4 leading-relaxed">
                        {description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100">
                        <span className="text-sm font-bold text-indigo-600 group-hover:text-blue-600 transition-colors duration-200 flex items-center justify-center">
                            {link}
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
