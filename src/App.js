// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PopularBooks from './components/PopularBooks';
import CommentSection from './components/CommentSection';

function App() {
    return (
        <Router>
            <div className="font-sans bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen">
                <Navbar />
                <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={<PopularBooks />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/comments/:bookId" element={<CommentSection />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

// Placeholder Contact component
function Contact() {
    return (
        <div className="text-center mt-10 text-white">
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="mt-4">Feel free to contact us at purnanandhkariyavula2004@gmail.com.</p>
        </div>
    );
}

export default App;
