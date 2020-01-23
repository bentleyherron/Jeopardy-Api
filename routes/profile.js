const express = require('express');
const router = express.Router();

// Models
const users = require('../models/user');

// Get form data
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});


// Requires Login
function requireLogin(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


router.get('/', async (req, res) => {
    res.render('profile', {
        locals: {
            pageTitle: `Profile`,
        },
        partials: {
            analytics: 'partials/analytics',
            head: '/partials/head',
            navbar: req.session.navbar.value,
            footer: 'partials/footer'
        }
    });
});

// Get change password page
router.get('/change-password', requireLogin, (req, res, next) => {
    res.render('change-password', {
        locals: {
            pageTitle: 'Change Password',
            submitValue: 'Change Password'
        },
        partials: {
            analytics: 'partials/analytics',
            head: '/partials/head',
            navbar: req.session.navbar.value,
            footer: 'partials/footer'
        }
    });
});

// Signup post
router.post('/change-password', requireLogin, parseForm, async (req, res) => {
    const { password1, password2 } = req.body;
    if (password1 === password2) {
        const newPassword = users.createHash(password2);
        const userID = req.session.user.id;
        const updatedUser = await users.updatePassword(userID, newPassword);
        if (updatedUser) {
            res.redirect('/profile');
        } else {

        }
    } else {
        console.log("Could not update password.");
    }
});


module.exports = router;