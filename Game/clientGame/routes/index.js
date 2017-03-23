var express = require('express');
var logic = require('../bin/logic');
var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res) {
    res.render('index', { title: 'The Ultimate Stuck Shoot Game'});
=======
router.get('/', function(req, res, next) {
    res.render('index', { title: 'The Ultimate Stuck Shoot Game', customJs : '/Javascripts/indexApp.js'});
>>>>>>> master
});

module.exports = router;