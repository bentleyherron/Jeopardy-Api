var express = require('express');
var router = express.Router();

// Models
const question = require('../models/question');
const show = require('../models/show');
const values = require('../models/values');

// Routing
const showsRouter = require('./show');
const randomRouter = require('./random');

// Get for /api
router.get('/', (req, res)=> {
    res.status(200).send({
        success: true,
        time: new Date(),
        message: "This is the Jeopardy API",
    });
})

// Get for /api/rounds
router.get('/rounds', (req, res)=> {
    res.status(200).send({
        success: true,
        time: new Date(),
        message: "Got all the round names.",
        round_names: values.getRoundNames()
    })
})

// Get for /api/categories
router.get('/categories', (req, res)=> {
    res.status(200).send({
        success: true,
        time: new Date(),
        message: "Got all the category names.",
        category_names: values.getCategoryNames()
    })
})

// Get for /api/values
router.get('/values', (req, res)=> {
    res.status(200).send({
        success: true,
        time: new Date(),
        message: "Got all the values.",
        value_names: values.getValues()
    })
})




// Go to other views for different API calls
router.use('/show', showsRouter);
router.use('/random', randomRouter);




module.exports = router;