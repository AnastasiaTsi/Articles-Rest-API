/**
 * Dependencies
 */
const express = require('express');
const app = express();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const connectDB = require('./database/connection');
const categories = require('./routes/categories');
const articles = require('./routes/articles');

connectDB();
app.use(express.json());
app.use('/categories', categories);
app.use('/articles', articles);

/**
 * Get port from environment or use the port 9.000
 */
const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`))