var app = require('../app').app;
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {

    res.render('gameField', { title: 'new player' ,customJs:'/Javascripts/GameLogic.js'});
});

router.get('/NewPlayer', function(req, res, next) {
    res.render('newPlayer', {title: 'Create a new player', customJs: '/Javascripts/playerSelection.js'});
});

router.post('/NewPlayer', function(req, res) {
    if(req.body.playerName == ''){
        res.render('NewPlayer', {title: 'Lets play'});
    }
    else
    {
        res.redirect('./GameField');
    }

});

module.exports = router;
