// Test data
// const jeopardyData = require('../tests/testdata');
const jeopardyData = require('../tests/fulldata');

// Prebuilt lists for static things like categories, round names, etc.
const categoryData = require('../tests/lists/categories');
const roundData = require('../tests/lists/round_names');
const valuesData = require('../tests/lists/values');
//////////////////////////////////////////////////



// Gets the names of the rounds from jeopardyData
// (Currently uses an array with all the values)
function getRoundNames() {
    const roundNamesArray = roundData;
    // let roundNamesArray = []
    // for (show of jeopardyData) {
    //     if (!roundNamesArray.includes(show.Round)) {
    //         roundNamesArray.push(show.Round);
    //     } else {
    //         // pass
    //     }
    // }
    return roundNamesArray;
}

// Gets the names of the categories from jeopardyData
// (Currently uses an array with all the values)
function getCategoryNames() {
    const categoryNamesArray = categoryData;
    // let categoryNamesArray = []
    // for (show of jeopardyData) {
    //     if (!categoryNamesArray.includes(show.Category)) {
    //         categoryNamesArray.push(show.Category);
    //     } else {
    //         // pass
    //     }
    // }
    return categoryNamesArray;
}

// Gets the names of the dollar values from jeopardyData
// (Currently uses an array with all the values)
function getValues() {
    const valuesArray = valuesData;
    // let valuesArray = []
    // for (show of jeopardyData) {
    //     if (!valuesArray.includes(show.Value)) {
    //         valuesArray.push(show.Value);
    //     } else {
    //         // pass
    //     }
    // }
    return valuesArray;
}


module.exports = {
    getRoundNames,
    getCategoryNames,
    getValues
}