import Link from 'next/link';

const NavCard = ({ href, title, description, icon }) => (
    <Link 
        href={href}
        className="block p-6 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition duration-300 transform group"
    >
        <div className="flex items-center space-x-4">
            <div className="text-4xl text-indigo-600 group-hover:text-indigo-800 transition duration-300">
                {icon}
            </div>
            <div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-700">{title}</h3>
                <p className="mt-1 text-gray-500">{description}</p>
            </div>
        </div>
    </Link>
);

export default NavCard;