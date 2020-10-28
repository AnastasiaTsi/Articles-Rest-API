const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true
    },
    content: {
        type: String,
        required: true,
        minlength: 10
    },
    description: {
        type: String,
        default: "No available description",
        maxlength: 255
    }
});

const Article = mongoose.model('Article', articleSchema);

function validateArticle(article) {
    const schema = {
        title: Joi.string().min(3).max(50).required(),
        categoryId: Joi.objectId().required(),
        content: Joi.string().min(10).required(),
        description: Joi.string().max(255)
    }
    return Joi.validate(article, schema);
}

exports.Article = Article;
exports.validate = validateArticle;

