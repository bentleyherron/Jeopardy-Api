const express = require('express');
const router = express.Router();

// Gets functions for grabbing data
const question = require('../models/question');


// Get for /api/question
// (Currently sends a random question)
router.get('/', (req, res)=> {
    res.status(200).send({
        success: true,
        time: Date.now(),
        message: `Got a random show question.`,
        question: question.getRandomQuestion()
    })
})



module.exports = router;