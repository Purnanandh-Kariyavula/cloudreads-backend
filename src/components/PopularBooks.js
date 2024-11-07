import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PopularBooks() {
    const [bookNames, setBookNames] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [images, setImages] = useState([]);
    const [votes, setVotes] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.post(`https://cjvajdcsse.execute-api.us-east-1.amazonaws.com/prod/getPopularBooks`, { operation: "getPopularBooks" })
            .then(response => {
                console.log("API Response:", response.data);
                const body = JSON.parse(response.data.body); // Parse the JSON string
                const { book_name, author, image, votes, rating } = body;

                setBookNames(book_name || []);
                setAuthors(author || []);
                setImages(image || []);
                setVotes(votes || []);
                setRatings(rating || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching popular books:", error);
                setError("Failed to load popular books. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading popular books...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6 text-center">Top 50 Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookNames.length > 0 ? (
                    bookNames.map((bookName, index) => (
                        <div key={index} className="bg-gray-800 text-white p-6 rounded-lg shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl">
                            <img className="w-full h-64 object-cover rounded-lg mb-4" src={images[index]} alt={bookName} />
                            <h3 className="text-2xl font-bold mb-2">{bookName}</h3>
                            <p className="text-lg mb-2">{authors[index]}</p>
                            <div className="flex justify-between items-center">
                                <p className="text-sm">Votes: {votes[index]}</p>
                                <p className="text-sm">Rating: {ratings[index] ? ratings[index].toFixed(2) : "N/A"}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-400">No popular books found.</p>
                )}
            </div>
        </div>
    );
}

export default PopularBooks;
