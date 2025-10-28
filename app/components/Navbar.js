import Link from 'next/link';

const Navbar = () => (
    <nav className="bg-indigo-700 p-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-white hover:text-indigo-200 transition">
                Drone App
            </Link>
            <div className="space-x-4">
                <Link href="/config" className="text-white hover:text-indigo-200 transition">
                    Config
                </Link>
                <Link href="/log-temp" className="text-white hover:text-indigo-200 transition">
                    Log Temp
                </Link>
                <Link href="/logs" className="text-white hover:text-indigo-200 transition">
                    View Logs
                </Link>
            </div>
        </div>
    </nav>
);

export default Navbar;