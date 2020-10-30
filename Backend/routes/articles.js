const express = require('express');
const router = express.Router();
const { Article, validate } = require('../models/article');
const asyncMiddleware = require('../middleware/async');
const { Category } = require('../models/category');


router.get('/', asyncMiddleware(async (req, res) => {

    console.log(req.query);
    console.log(req.query.category);

    if((Object.keys(req.query).length === 0 && (req.query).constructor === Object)|| (req.query.flag == "true" &&  !req.query.category)){
        console.log('1');
        const articles = await Article.find()
        res.send(articles)
    }else if(req.query.flag == "false" && req.query.category){

        console.log('im in my queeens');
        const articles = await Article.find({ "category" : req.query.category}).select('-content');
        res.send(articles)
    }else if(req.query.flag == "false"){

        console.log('hacking?');
        const articles = await Article.find().select('-content');
        res.send(articles)
    }else{
        console.log('4');
        const articles = await Article.find({ "category" : req.query.category});
        res.send(articles)
    }
}));


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

router.put('/:id', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    console.log(":id -----------------");
    const article = await Article.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            category: {
                _id: category._id,
                name: category.name
            },
            content: req.body.content
        },
        { new: true });

    if (!article) return res.status(404).send('The Article with the given ID was not found.');

    res.send(article);
}));

router.put('/', asyncMiddleware(async (req, res) => {

    if(Object.keys(req.query).length === 0 && (req.query).constructor === Object ){
        res.status(400).send('Bad request');

    }else{
        const category = await Category.findById(req.body.categoryId);
        const articleBefore = await Article.find(req.query);
        console.log(articleBefore[0].title);
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
    }


    res.send(category);

}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
    const article = await Article.findByIdAndRemove(req.params.id);

    if (!article) return res.status(404).send('The Article with the given ID was not found.');

    res.send(article);
}));

router.delete('/', asyncMiddleware(async (req, res) => {
    if(Object.keys(req.query).length === 0 && (req.query).constructor === Object ){
        res.status(400).send('Bad request');

    }else{
        
        const article = await Article.findOneAndDelete(req.query);
        if (!article) return res.status(404).send('The article with the given title was not found.');
        res.send(article)
    }
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
    
    const  article = await Article.findById(req.params.id);

    if (!article) return res.status(404).send('The article with the given ID was not found.');

    res.send(article)
}));

module.exports = router;