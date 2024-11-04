// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Route for searching books by title or author
router.get('/search', (req, res) => {
    const { query } = req.query; // get the search query from the request

    const sql = `SELECT * FROM books WHERE title LIKE ? OR author LIKE ?`;
    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) {
            console.error('Error fetching books:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

module.exports = router;
