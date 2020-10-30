const express = require('express');
const router = express.Router();
const { Category, validate } = require('../models/category');
const asyncMiddleware = require('../middleware/async');



router.get('/', asyncMiddleware(async (req, res) => {
    const categories = await Category.find();
    res.send(categories)
}));


router.post('/', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = new Category({ name: req.body.name });
    category = await category.save();

    res.send(category);
}));

router.put('/:id', asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(req.params.id,
        { name: req.body.name },
        { new: true });

    if (!category) return res.status(404).send('The Category with the given ID was not found.');

    res.send(category);
}));

router.delete('/:id', asyncMiddleware(async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) return res.status(404).send('The Category with the given ID was not found.');

    res.send(category);
}));

router.delete('/', asyncMiddleware(async (req, res) => {

    if(Object.keys(req.query).length === 0 && (req.query).constructor === Object ){
        res.status(400).send('Bad request');

    }else{
        
        const category = await Category.findOneAndDelete(req.query);
        if (!category) return res.status(404).send('The Category with the given Name was not found.');
        res.send(category)
    }
}));

router.get('/:id', asyncMiddleware(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category)
}));

module.exports = router;