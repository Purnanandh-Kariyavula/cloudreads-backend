import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-green-600 p-4">
            <h1 className="text-white text-3xl font-bold">CloudReads</h1>
            <ul className="flex space-x-4 mt-2">
                <li><Link to="/" className="text-white hover:text-gray-300">Home</Link></li>
                <li><Link to="/contact" className="text-white hover:text-gray-300">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
