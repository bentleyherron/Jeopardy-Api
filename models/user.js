const db = require('./connection');
const bcrypt = require('bcryptjs');


function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

function convertUsername(username) {
    return username.toLowerCase();
};

function createAPIKey(keyString) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(keyString, salt);
};

function create(email, password) {
    const lowerUsername = email.toLowerCase();
    const hash = createHash(password);
    const loginCombined = email + process.env.API_NAMESPACE;
    const apiKey = createAPIKey(loginCombined, process.env.API_NAMESPACE);
    const newUser = {
        username: lowerUsername,
        joined_date: new Date(),
        hash,
        api_key: apiKey
    };
    return newUser;
};

async function login(email, password) {
    const lowerEmail = email.toLowerCase();
    const theUser = await getUserByEmail(lowerEmail);
    return bcrypt.compareSync(password, theUser.password);
};

async function checkUsername(email) {
    const lowerEmail = email.toLowerCase();
    const theUser = await db.query(`select * from users where email=$1`, [lowerEmail]);
    return theUser;
};

async function getUserByEmail(email) {
    const lowerEmail = email.toLowerCase();
    const theUser = await db.one(`select * from users where email=$1`, [lowerEmail]);
    return theUser;
};

async function addUser(user) {
    const theUser = await db.one(`
    insert into users (email, password, joined_date, api_key) 
    values ($1, $2, $3, $4) 
    returning id`, 
    [user.username, user.hash, user.joined_date, user.api_key]
    );
    return theUser;
};

async function updatePassword(userID, password) {
    const result = await db.result(`update users set password=$1 where id=$2;`, [password, userID]);
    if (result.rowCount === 1) {
        return userID;
    } else {
        return null;
    }
};

async function updateLastLoggedIn(userID) {
    const date = new Date();
    const result = await db.result(`update users set last_logged_in=$1 where id=$2;`, [date, userID]);
    if (result.rowCount === 1) {
        return userID;
    } else {
        return null;
    }
};

async function getUserAPIKey(userID) {
    const theUser = await db.one(`select api_key from users where id=$1`, [userID]);
    return theUser.api_key;
};


module.exports = {
    createHash,
    convertUsername,
    create,
    login,
    checkUsername,
    getUserByEmail,
    addUser,
    updatePassword,
    getUserAPIKey,
    updateLastLoggedIn
}