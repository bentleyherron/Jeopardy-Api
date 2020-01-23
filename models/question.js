// Test data
const jeopardyData = require('../tests/fulldata');
//////////////////////////////////////////////////


// Gets random number to pick from the jeopardyData index
function randomNumber() {
    const dataSize = jeopardyData.length;
    return Math.floor((Math.random() * dataSize) + 0);
}

// Get random question by using int from randomNumber
function getRandomQuestion() {
    const randNum = randomNumber();
    return jeopardyData[randNum];
}


module.exports = {
    randomNumber,
    getRandomQuestion
}