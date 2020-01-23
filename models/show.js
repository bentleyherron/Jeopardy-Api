// Test data
// const jeopardyData = require('../tests/testdata');
const jeopardyData = require('../tests/fulldata');

// Prebuilt lists for static things like categories, round names, etc.
const showNumberData = require('../tests/lists/show_numbers');
///////////////////////////////////////////////////////



// Gets the episode numbers for all the episodes
// (Currently uses an array with all the values)
function getShowNumbers() {
    const showNumbers = showNumberData;
    // let showNumbers = []
    // for (show of jeopardyData) {
    //     if (!showNumbers.includes(show['Show Number'])) {
    //         showNumbers.push(show['Show Number']);
    //     } else {
    //         // pass
    //     }
    // }
    return showNumbers;
}

// Checks to see if a episode number exists
function checkShowNumber(question, showNumber) {
    return question['Show Number'] == showNumber;
}

// Checks to see if a round exists
function checkRound(question, roundNumber) {
    let roundName = "";
    if (roundNumber == 1) {
        roundName = "Jeopardy!";
    } else if (roundNumber == 2) {
        roundName = "Double Jeopardy!";
    } else if (roundNumber == 3) {
        roundName = "Final Jeopardy!";
    } else if (roundNumber == 4) {
        roundName = "Tiebreaker";
    } else {
        roundName = "Jeopardy!";
    }
    return question['Round'] == roundName;
}

// Fiters out episodes by episode number and adds them to an array to return
function getShowNumberQuestions(showNumber) {
    let showQuestions;
    showQuestions = jeopardyData.filter(question => checkShowNumber(question, showNumber));
    return showQuestions;
}

// Fiters out episodes by episode number and round. adds them to an array to return
function getShowNumberRound(showNumber, roundNumber) {
    let showQuestions;
    let roundQuestions;
    showQuestions = getShowNumberQuestions(showNumber);
    roundQuestions = showQuestions.filter(question => checkRound(question, roundNumber));
    return roundQuestions;
}

// Gets shows by date
// Takes the arguments checks them against a split array of the air date from jeopardyData
// Checks to see if the month was included
function getShowsByDate(year, month=0) {
    let showsFromDate = []
    if (!month === 0) {
        for (show of jeopardyData) {
            const newDate = show['Air Date'].split('-')
            if (newDate[0] === year && newDate[1] === month) {
                showsFromDate.push(show);
            } else {
                // pass
            }
        }
    } else {
        for (show of jeopardyData) {
            const newDate = show['Air Date'].split('-')
            if (newDate[0] == year) {
                showsFromDate.push(show);
            } else {
                // pass
            }
        }
    }
    return showsFromDate;
}



module.exports = {
    getShowNumbers,
    checkShowNumber,
    getShowNumberQuestions,
    getShowNumberRound,
    getShowsByDate
}