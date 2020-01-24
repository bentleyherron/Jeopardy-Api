const express = require('express');
const router = express.Router();

// Models
const users = require('../models/user');

// Get form data
const bodyParser = require('body-parser');
const parseForm = bodyParser.urlencoded({
    extended: true
});


// Get login page
router.get('/', (req, res, next) => {
	res.render('auth', {
		locals: {
			pageTitle: 'Login',
			submitValue: 'Login'
		},
		partials: {
			analytics: 'partials/analytics',
		}
	});
});

// Login post
router.post('/', parseForm, async (req, res) => {
	const { email, password } = req.body;
	const checkUser = await users.checkUsername(email);
	if (checkUser) {
		const didLoginSuccessfully = await users.login(email, password);
		if (didLoginSuccessfully) {
			const theUser = await users.getUserByEmail(email);
			const updateLogin = await users.updateLastLoggedIn(theUser.id);
			// req.session.navbar.value = '/partials/navbar-loggedin';
			req.session.user = {
				email: theUser.email, 
				id: theUser.id
			};
			req.session.save(() => { 
				res.redirect('/profile');
			});
		} else {
			res.send('Could not log you in. Please Try Again.');
		}
	} else {
		res.send('Could not find a that email address.');
	}
});



module.exports = router;