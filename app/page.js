// src/app/page.js
import NavCard from "./components/NavCard";
// ดึงค่า DRONE_ID โดยตรงจาก Environment Variable (Server-side)
const DRONE_ID = process.env.NEXT_PUBLIC_DRONE_ID || 'N/A';

export default function HomePage() {
    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <header className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
                    Drone Management Dashboard 🛸
                </h1>
                <p className="text-xl text-gray-600">
                    จัดการข้อมูล Drone ID: **<span className="font-mono text-indigo-600">{DRONE_ID}</span>**
                </p>
            </header>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Page #1: View Config */}
                <NavCard
                    href="/config"
                    title="1. View Configuration"
                    description="ดูข้อมูลการตั้งค่าหลักของโดรน: ชื่อ, ประเทศ, สถานะไฟ"
                    icon="⚙️"
                />

                {/* Page #2: Temperature Log Form */}
                <NavCard
                    href="/log-temp"
                    title="2. Log Temperature"
                    description="บันทึกข้อมูลอุณหภูมิ (Celsius) ใหม่ไปยัง API Server"
                    icon="🌡️"
                />

                {/* Page #3: View Logs */}
                <NavCard
                    href="/logs"
                    title="3. View Logs History"
                    description="ตรวจสอบรายการ Log อุณหภูมิย้อนหลัง พร้อมระบบแบ่งหน้า"
                    icon="📜"
                />
            </div>
        </div>
    );
}