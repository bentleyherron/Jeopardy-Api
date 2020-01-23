var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    partials: {
      analytics: 'partials/analytics'
    }
  });
});



module.exports = router;