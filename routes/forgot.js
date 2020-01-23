const express = require('express');
const router = express.Router();


router.get('/username', (req, res, next) => {
	res.render('forgot', {
		locals: {
			pageTitle: 'Forgot Username'
		},
		partials: {
			analytics: 'partials/analytics'
		}
	});
});

router.get('/password', (req, res, next) => {
	res.render('forgot', {
		partials: {
			locals: {
				pageTitle: 'Forgot Username'
			},
			analytics: 'partials/analytics'
		}
	});
});


module.exports = router;