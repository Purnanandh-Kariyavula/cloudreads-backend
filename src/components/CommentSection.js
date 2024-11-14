// CommentSection.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CommentSection() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [bookNames, setBookNames] = useState("");
    const [authors, setAuthors] = useState("");
    const [votes, setVotes] = useState("");
    const [ratings, setRatings] = useState("");
    const [usernames, setUsernames] = useState([]);
    const [commentss, setCommentss] = useState([]);
    const [username, setUsername] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post('https://cjvajdcsse.execute-api.us-east-1.amazonaws.com/prod/getPopularBooks', {
            operation: 'fetchComments',
            bookId
        })
        .then((response) => {
            const body = JSON.parse(response.data.body);
            const { comments } = body;
            setUsernames(comments.map((comment) => comment.username));
            setCommentss(comments.map((comment) => comment.comment));
        })
        .catch((error) => {
            console.error('Failed to fetch comments:', error);
        });
    }, [bookId]);

    useEffect(() => {
        axios.post(`https://cjvajdcsse.execute-api.us-east-1.amazonaws.com/prod/getPopularBooks`, { operation: "getPopularBooks" })
            .then(response => {
                const body = JSON.parse(response.data.body);
                const { book_name, author, image, votes, rating } = body;
            const filteredBooks = book_name.map((name, index) => ({
                book_name: name,
                author: author[index],
                image: image[index],
                votes: votes[index],
                rating: rating[index],
            })).filter(book => book.book_name === bookId);

            setBookNames(filteredBooks.map(book => book.book_name));
            setAuthors(filteredBooks.map(book => book.author));
            setVotes(filteredBooks.map(book => book.votes));
            setRatings(filteredBooks.map(book => book.rating));
            setLoading(false);
            })
            .catch(error => {
                console.error("Failed to load popular books. Please try again later.", error);
                setLoading(false);
            });
    }, [bookId]);

    const handleAddComment = async () => {
        try {
            await axios.post(`https://cjvajdcsse.execute-api.us-east-1.amazonaws.com/prod/getPopularBooks`, {
                operation: 'addComment',
                bookId,
                username,
                comment
            });
            setUsernames([...usernames, username]);
            setCommentss([...commentss, comment]);
            setUsername("");
            setComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="flex space-x-1 animate-flip">
                    <div className="w-8 h-12 bg-indigo-600 rounded-sm origin-bottom-left transform rotate-0 animate-page1"></div>
                    <div className="w-8 h-12 bg-indigo-500 rounded-sm origin-bottom-left transform rotate-0 animate-page2"></div>
                    <div className="w-8 h-12 bg-indigo-400 rounded-sm origin-bottom-left transform rotate-0 animate-page3"></div>
                </div>
                <p className="text-white ml-4 text-lg">Loading Comment Section...</p>
            </div>
        );
    }

    return (
        <div className="bg-transparent min-h-screen p-8">
            <button 
                onClick={() => navigate(-1)}
                className="bg-indigo-700 text-white px-4 py-2 rounded-lg mb-6 transition duration-300 hover:bg-indigo-800"
            >
                Back to Home
            </button>

            {bookNames && (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mb-8">
                    <h1 className="text-2xl font-bold mb-2">{bookNames}</h1>
                    <p className="text-gray-700">Author: {authors}</p>
                    <p className="text-gray-700">Rating: {ratings}</p>
                    <p className="text-gray-700">Votes: {votes}</p>
                </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto space-y-6">
                <h2 className="text-xl font-bold mb-4">Comments</h2>

                {/* Add Comment Form at the Top */}
                <div className="space-y-2">
                    <input 
                        type="text" 
                        placeholder="Your name" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <textarea 
                        placeholder="Your comment" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                    <button 
                        onClick={handleAddComment} 
                        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-indigo-700"
                    >
                        Add Comment
                    </button>
                </div>

                {/* Display Comments */}
                <div className="border-t pt-4 space-y-4 mt-6">
                    {commentss.length > 0 ? (
                        <ul className="space-y-4">
                            {commentss.map((c, index) => (
                                <li key={index} className="bg-gray-200 p-4 rounded-lg border-b border-gray-300">
                                    <strong className="block text-indigo-700">{usernames[index]}</strong>
                                    <p className="text-gray-700">{c}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CommentSection;
