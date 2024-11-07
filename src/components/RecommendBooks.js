import React, { useState } from 'react';
import axios from 'axios';

function RecommendBooks() {
    const [userInput, setUserInput] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`https://cjvajdcsse.execute-api.us-east-1.amazonaws.com/prod/recommendBooks`, { operation: "recommendBooks", user_input: userInput })
            .then(response => {
                setRecommendations(response.data);
                setError('');
            })
            .catch(() => {
                setError("Book not found in database. Please try another title.");
                setRecommendations([]);
            });
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold mb-6">Recommend Books</h1>
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter a book title"
                    className="p-2 border border-gray-300 rounded w-full mb-2"
                />
                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">Recommend</button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                    <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <img className="w-full h-64 object-cover rounded-lg mb-4" src={rec.image} alt={rec.title} />
                        <h3 className="text-2xl font-bold">{rec.title}</h3>
                        <p className="text-lg">{rec.author}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RecommendBooks;
