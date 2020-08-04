var router = require('express').Router();

router.use('/translate', require('./translate'));

module.exports = router;