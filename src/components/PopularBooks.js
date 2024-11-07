import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

function PopularBooks() {
    const [bookNames, setBookNames] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [images, setImages] = useState([]);
    const [votes, setVotes] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch popular books data
    useEffect(() => {
        axios.post(`https://cjvajdcsse.execute-api.us-east-1.amazonaws.com/prod/getPopularBooks`, { operation: "getPopularBooks" })
            .then(response => {
                const body = JSON.parse(response.data.body);
                const { book_name, author, image, votes, rating } = body;

                setBookNames(book_name || []);
                setAuthors(author || []);
                setImages(image || []);
                setVotes(votes || []);
                setRatings(rating || []);
                setLoading(false);
            })
            .catch(error => {
                setError("Failed to load popular books. Please try again later.");
                setLoading(false);
            });
    }, []);

    const handleSearch = (e) => setSearchTerm(e.target.value);

    const filteredBooks = bookNames.filter((name) =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                {/* Book-Flipping Loading Animation */}
                <div className="flex space-x-1 animate-flip">
                    <div className="w-8 h-12 bg-indigo-600 rounded-sm origin-bottom-left transform rotate-0 animate-page1"></div>
                    <div className="w-8 h-12 bg-indigo-500 rounded-sm origin-bottom-left transform rotate-0 animate-page2"></div>
                    <div className="w-8 h-12 bg-indigo-400 rounded-sm origin-bottom-left transform rotate-0 animate-page3"></div>
                </div>
                <p className="text-white ml-4 text-lg">Loading popular books...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-600 mt-10">{error}</div>;
    }

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 min-h-screen p-8">
            {/* Title and Subtitle */}
            <h1 className="text-white text-4xl font-bold text-center mb-2">Top 50 Books</h1>
            <p className="text-white text-lg text-center mb-8">Discover the most popular books voted by readers</p>

            {/* Search Bar */}
            <div className="flex justify-center items-center mb-8">
                <div className="relative w-full max-w-lg">
                    <input
                        type="text"
                        placeholder="Search for a book..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-4 py-2 rounded-full text-lg outline-none text-gray-800 shadow-md"
                    />
                    <FaSearch className="absolute top-3 right-4 text-gray-500" />
                </div>
            </div>

            {/* Book List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((bookName, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-xs mx-auto">
                            {/* Image */}
                            <div className="relative w-full h-60 overflow-hidden">
                                <img 
                                    src={images[index]} 
                                    alt={bookName} 
                                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
                                />
                            </div>
                            {/* Text Content */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{bookName}</h3>
                                <p className="text-gray-600 text-sm mb-2">{authors[index]}</p>
                                <div className="flex justify-between items-center text-gray-700 text-sm">
                                    <p>Votes: <span className="font-medium">{votes[index]}</span></p>
                                    <p>Rating: <span className="font-medium">{ratings[index] ? ratings[index].toFixed(2) : "N/A"}</span></p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-white text-lg">No popular books found.</p>
                )}
            </div>
        </div>
    );
}

export default PopularBooks;
