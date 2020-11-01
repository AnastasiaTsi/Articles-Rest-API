const express = require('express');
const router = express.Router();
const { Article, validate } = require('../models/article');
const asyncMiddleware = require('../middleware/async');
const { Category } = require('../models/category');


/**
 * Get articles 
 * flag - return with content or not
 */
router.get('/', asyncMiddleware(async (req, res) => {
    /**
     * Get all the articles with a content
     */
    if((Object.keys(req.query).length === 0 && (req.query).constructor === Object)|| (req.query.flag == "true" &&  !req.query.category)){
        const articles = await Article.find()
        res.send(articles)

    /**
     * Get all the articles without the content at a specific category
     */
    }else if(req.query.flag == "false" && req.query.category){
        const articles = await Article.find({ "category" : req.query.category}).select('-content');
        res.send(articles)

    /**
     * Get all articles without content
     */
    }else if(req.query.flag == "false"){
        const articles = await Article.find().select('-content');
        res.send(articles)

        /**
         * Get all articles from specific category with content
         */
    }else{
        const articles = await Article.find({ "category" : req.query.category});
        res.send(articles)
    }
}));

/**
 * Posting a new article
 */
router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) { return res.status(400).send('Invalid category') }

    let article = new Article({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        content: req.body.content,
        description: req.body.description
    });
    article = await article.save();

    res.send(article);
}));

/**
 * Update the content of an article with the article Id 
 */
router.put('/:id', asyncMiddleware(async (req, res) => {
    console.log(req.body);
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const category = await Category.findById(req.body.categoryId);
        const articleBefore = await Article.find(req.query);

        const article = await Article.findOneAndUpdate(req.query,
            {
                title: articleBefore[0].title,
                category: {
                    _id: category._id,
                    name: category.name
                },
                content: req.body.content,
                description: articleBefore[0].description
            },
            { new: true });

        if (!article) return res.status(404).send('The Article with the given title was not found.');
        res.send(article)
}));

/**
 * Delete specific article with the article Id 
 */
router.delete('/:id', asyncMiddleware(async (req, res) => {
    const article = await Article.findByIdAndRemove(req.params.id);
    if (!article) return res.status(404).send('The Article with the given ID was not found.');
    res.send(article);
}));

/**
 * Delete article using the title 
 */
router.delete('/', asyncMiddleware(async (req, res) => {
    if(Object.keys(req.query).length === 0 && (req.query).constructor === Object ){
        res.status(400).send('Bad request');
    }else{
        
        const article = await Article.findOneAndDelete(req.query);
        if (!article) return res.status(404).send('The article with the given title was not found.');
        res.send(article)
    }
}));

/**
 * Get article with its Id or by name
 */
router.get('/:id', asyncMiddleware(async (req, res) => {

    /**
     * Get the article with a content
     */
    if(req.query.flag == "true"){
        const articles = await Article.find( {"title" : req.params.id})
        res.send(articles)

    /**
     * Get article without content
     */

    }else{
        const articles = await Article.find( {"title" : req.params.id}).select('-content');
        res.send(articles)
    }

    res.send(article)
}));

module.exports = router;