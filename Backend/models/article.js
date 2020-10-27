const Joi = require('joi');
const mongoose = require('mongoose');
const { categorySchema } = require('./category');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    category: {
        type: categorySchema,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 10
    }
});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(article) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        categoryId: Joi.objectId().required(),
        content: Joi.string().min(10).required(),
    }
    return Joi.validate(article, schema);
}

exports.Article = Article;
exports.validate = validateArticle;

