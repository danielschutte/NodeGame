var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/GameField', function(req, res, next) {

    res.render('GameField', { title: 'new player' ,customJs:'/Javascripts/GameLogic.js'});
});

router.get('/NewPlayer', function(req, res, next) {
    res.render('newPlayer', {title: 'Create a new player', customJs: '/Javascripts/newPlayer.js'});
});

module.exports = router;