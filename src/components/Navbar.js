import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa';

function Navbar() {
    return (
        <nav className="bg-indigo-600 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center text-white text-2xl font-bold">
                    <FaBookOpen className="mr-2" />
                    CloudReads
                </Link>
                <ul className="flex space-x-4">
                    <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
                    <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
