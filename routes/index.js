var router = require('express').Router();

router.use('/login', require('./login'));
router.use('/signup', require('./signup'));
router.use('/update', require('./update'));

module.exports = router;  
