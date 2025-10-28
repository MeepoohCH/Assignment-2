'use client';

import React, { useState } from 'react';
import Link from 'next/link'; 


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // ปรับปรุง Label ให้ดูเป็นทางการและสอดคล้องกับ Pages
    const navItems = [
        { href: "/config", label: "Configuration" },
        { href: "/log-temp", label: "Log Data" }, // เปลี่ยนจาก Log Form
        { href: "/logs", label: "View History" },
    ];

    // Indigo/Blue Gradient Class
    const gradientTextClass = "bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500";
    
    // Base Class for Interactive elements (Indigo theme)
    const baseInteractiveClass = "text-indigo-600 hover:text-indigo-700 transition duration-150";

    return (
        <nav className="bg-white/95 backdrop-blur-xl shadow-md sticky top-0 z-50 border-b border-gray-100/70">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20"> 
                    
                    {/* 1. Logo Section: ใช้ Indigo/Blue Accent */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-3xl font-extrabold transition duration-300 flex items-center">
                            <span className="text-gray-900 tracking-tight">
                                Drone
                            </span>
                            <span className={`text-xl ${gradientTextClass} ml-2 font-black border border-indigo-200 px-2 rounded-lg shadow-sm`}>
                                Console
                            </span>
                        </Link>
                    </div>

                    {/* 2. Desktop Navigation */}
                    <div className="hidden md:flex items-center">
                        <div className="flex space-x-8">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.href}
                                    href={item.href} 
                                    className="relative text-gray-700 text-base font-semibold py-2 transition-all duration-300 group hover:text-indigo-600"
                                >
                                    {item.label}
                                    {/* Underline Hover Effect: Indigo/Blue Gradient */}
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 3. Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            // ใช้ Base Class สำหรับ Hover Effect
                            className={`inline-flex items-center justify-center p-2 rounded-md text-gray-700 ${baseInteractiveClass.replace('hover:text-indigo-700', 'hover:text-indigo-600')} hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition duration-150`}
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. Mobile Menu Content */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white/95 backdrop-blur-xl shadow-xl border-t border-gray-200`}>
                <div className="px-4 pt-2 pb-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)} 
                            // ใช้ Hover Class ที่ชัดเจน
                            className={`block px-3 py-2 rounded-lg text-base font-semibold text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 transition duration-300`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
