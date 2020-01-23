const db = require('./connection');
const bcrypt = require('bcryptjs');


function createHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

function create(username, password) {
    const lowerUsername = username.toLowerCase();
    const hash = createHash(password);
    const newUser = {
        username: lowerUsername,
        hash
    };
    return newUser;
};

async function login(username, password) {
    const lowerUsername = username.toLowerCase();
    const theUser = await getByUsername(lowerUsername);
    return bcrypt.compareSync(password, theUser.hash);
};

async function checkUsername(username) {
    const lowerUsername = username.toLowerCase();
    const theUser = await db.query(`select * from users where name=$1`, [lowerUsername]);
    return theUser;
};

async function getUser(username) {
    const lowerUsername = username.toLowerCase();
    const theUser = await db.one(`select * from users where name=$1`, [lowerUsername]);
    return theUser;
};

async function addUser(user) {
    const theUser = await db.one(`insert into users (name, hash) values ($1, $2) returning id`, [user.username, user.hash]);
    return theUser;
};

async function updatePassword(userID, password) {
    const result = await db.result(`update users set hash=$1 where id=$2;`, [password, userID]);
    if (result.rowCount === 1) {
        return id;
    } else {
        return null;
    }
};


module.exports = {
    createHash,
    create,
    login,
    checkUsername,
    getUser,
    addUser,
    updatePassword
}