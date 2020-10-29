const express = require('express');
const router = express.Router();
const { Article, validate } = require('../models/article');
const asyncMiddleware = require('../middleware/async');
const { Category } = require('../models/category');


router.get('/', asyncMiddleware(async (req, res) => {
    
    console.log(JSON.stringify(req.query));

    if(Object.keys(req.query).length === 0 && (req.query).constructor === Object ){
        console.log('hry hay ho');
        const categories = await Article.find();

        res.send(categories)
    }else{

        const categories = await Article.find(req.query);
        console.log(categories);
                   res.send(categories)
    }
}));


router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findById(req.body.categoryId);
    if (!category) { console.log('no category with this ID - ' + req.body.categoryId); return res.status(400).send('Invalid category') }

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
    console.log(category);
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

router.delete('/:id', asyncMiddleware(async (req, res) => {
    const article = await Article.findByIdAndRemove(req.params.id);

    if (!article) return res.status(404).send('The Article with the given ID was not found.');

    res.send(article);
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
    
    const  article = await Article.findById(req.params.id);

    if (!article) return res.status(404).send('The article with the given ID was not found.');

    res.send(article)
}));

// router.get('/:id', async(req, res) =>{
//     console.log('tsoupraa');
//     console.log(req.params.id);
// });


// router.get('/?name=key', asyncMiddleware(async (req, res) => {
//     console.log('im in ');
//     const article = await Article.find(req.params.key);
//     console.log('article - ' + article);
//     console.log('key - ' + key);
//     if (!article) return res.status(404).send('The article with the given name was not found.');

//     res.send(article)
// }));
module.exports = router;

// let article = await Article.find({name: req.params.id});
// console.log(article);
// if(article === tmp)