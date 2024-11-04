// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route for submitting a review
router.post('/:bookId/review', (req, res) => {
    const { bookId } = req.params;
    const { userId, rating, review } = req.body;

    const sql = `INSERT INTO reviews (book_id, user_id, rating, review) VALUES (?, ?, ?, ?)`;
    db.query(sql, [bookId, userId, rating, review], (err, result) => {
        if (err) {
            console.error('Error adding review:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Review added successfully!');
    });
});

module.exports = router;
