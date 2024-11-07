import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PopularBooks from './components/PopularBooks';

function App() {
    return (
        <Router>
            <div className="bg-gray-900 min-h-screen text-gray-200">
                <Navbar />
                <div className="container mx-auto p-6">
                    <Routes>
                        <Route path="/" element={<PopularBooks />} />
                        <Route path="/recommend" element={<RecommendBooks />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

// Placeholder Contact component
function Contact() {
    return (
        <div>
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg">Feel free to contact us at purnanandhkariyavula2004@gmail.com.</p>
        </div>
    );
}

export default App;
