const express = require('express');
const router = express.Router();

// Models
const show = require('../models/show');


router.get('/', (req, res)=> {
    res.status(200).send({
        success: true,
        time: Date.now(),
        message: "Got all the show numbers.",
        show_numbers: show.getShowNumbers()
    })
})

router.get('/:showNumber', (req, res)=> {
    const showNumber = parseInt(req.params.showNumber, 10);
    res.status(200).send({
        success: true,
        time: Date.now(),
        message: `Got all the questions from show: ${showNumber}.`,
        questions: show.getShowNumberQuestions(showNumber)
    })
})

router.get('/:showNumber/:roundNumber', (req, res)=> {
    const showNumber = parseInt(req.params.showNumber, 10);
    const roundNumber = parseInt(req.params.roundNumber, 10);
    res.status(200).send({
        success: true,
        time: Date.now(),
        message: `Got all the questions from show: ${showNumber}.`,
        questions: show.getShowNumberRound(showNumber, roundNumber)
    })
})

router.get('/date/:year', (req, res)=> {
    const year = parseInt(req.params.year, 10);
    res.status(200).send({
        success: true,
        time: Date.now(),
        message: `Got all the questions from: ${year}.`,
        questions: show.getShowsByDate(year)
    })
})

router.get('/date/:year/:month', (req, res)=> {
    const year = parseInt(req.params.year, 10);
    const month = parseInt(req.params.month, 10);
    const questions = show.getShowsByDate(year, month)
    let message;
    if (month.toString().length === 1) {
        message = `Got all the questions from: ${year}/0${month}.`;
    } else {
        message = `Got all the questions from: ${year}/0${month}.`;
    }
    res.status(200).send({
        success: true,
        time: Date.now(),
        message,
        questions
    })
})


module.exports = router;