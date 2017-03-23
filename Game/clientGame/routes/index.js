var express = require('express');
var logic = require('../bin/logic');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'The Ultimate Stuck Shoot Game', customJs : '/Javascripts/indexApp.js'});
});

module.exports = router;