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
router.get('/', (req, res, next) =>
{
	res.render('auth',
	{
		locals:
		{
			pagetitle: 'Login',
			submitValue: 'Login'
		},
		partials:
		{
			analytics: 'partials/analytics',
			head: '/partials/head',
			navbar: req.session.navbar.value,
			footer: '/partials/footer'
		}
	});
});

// Login post
router.post('/', parseForm, async (req, res) => {
	const { name, password } = req.body;
	const didLoginSuccessfully = await users.login(name, password);
	if (didLoginSuccessfully)
	{
		const theUser = await users.getByUsername(name);
		req.session.navbar.value = '/partials/navbar-loggedin';
		req.session.user = {
			name,
			id: theUser.id,
		};
		req.session.save(() =>
		{
			res.redirect('/profile');
		});
	}
	else
	{

	}
});



module.exports = router;