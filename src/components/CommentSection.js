// CommentSection.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CommentSection() {
    const { bookId } = useParams();
    const history = useNavigate();
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
            // comments.map((comment) => {
            //     comment.username = setUsernames([...usernames, comment.username]);
            //     comment.comment = setComments([...commentss, comment.comment]);
            // })
            // console.log(commentss);
            // console.log(usernames);
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
            // Filter books based on specific book_name if it exists
            const filteredBooks = book_name.map((name, index) => ({
                book_name: name,
                author: author[index],
                image: image[index],
                votes: votes[index],
                rating: rating[index],
            })).filter(book => book.book_name === bookId); // Replace specificBookName with the desired name

            // Separate filtered data into individual state arrays
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
                action: 'addComment',
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
        return <div className="flex justify-center items-center h-screen">Loading book details...</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <button 
                onClick={() => history.goBack()}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg mb-4 transition duration-300 hover:bg-indigo-600"
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

            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                {commentss.length > 0 ? (
                    <ul className="space-y-4 mb-4">
                        {commentss.map((c, index) => (
                            <li key={index} className="bg-gray-200 p-4 rounded-lg">
                                <strong>{usernames[index]}</strong>: {c}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No comments yet.</p>
                )}

                <input 
                    type="text" 
                    placeholder="Your name" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full p-2 mb-2 border rounded"
                />
                <textarea 
                    placeholder="Your comment" 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    className="w-full p-2 mb-2 border rounded"
                />
                <button onClick={handleAddComment} className="bg-indigo-500 text-white px-4 py-2 rounded-lg transition duration-300 hover:bg-indigo-600">
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
