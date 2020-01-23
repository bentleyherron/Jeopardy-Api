const express = require('express');
const router = express.Router();

// Models
const users = require('../models/user');

// Get form data
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});


// Get signup page
router.get('/', (req, res, next) => {
	res.render('auth', {
		locals: {
			pageTitle: 'Create Account',
			submitValue: 'Sign Up'
		},
		partials: {
			analytics: 'partials/analytics',
		}
	});
});

// Signup post
router.post('/', parseForm, async(req, res) => {
	const { name, password } = req.body;
	const checkUsername = await users.checkUsername(name);
	if (checkUsername.length > 0) {
		res.send(`<h1>Please try another username.</h1><br>
      <h4><a href="/signup">Return to Signup</a><h4>`);
	} else {
		const createdUser = await users.create(name, password);
		if (createdUser) {
			const theUser = await users.addUserToDB(createdUser);
			res.redirect('/login');
		} else {
			// pass
		}
	}
});


module.exports = router;