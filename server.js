require('dotenv').config();

// server.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const db = require('./db');


// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Use bodyParser to parse JSON request bodies
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
