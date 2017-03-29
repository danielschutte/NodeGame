var app = require('../app').app;
var express = require('express');
var logic = require('../bin/logic');
var router = express.Router();

/* GET users listing. */
// router.get('/GameField', function(req, res, next) {
//     res.render('GameField', { title: 'new player' ,customJs:'/Javascripts/GameLogic.js'});
// });

// New player
router.get('/newPlayer', function(req, res, next) {
    res.render('newPlayer', {title: 'Create a new player', customJs: '/Javascripts/newPlayer.js'});
});

// Player has to choose a username and a color, when failed redirect back to newplayer
router.post('/newPlayer', function(req, res, next) {
    // get data from fields
    var playerName = req.body.playerName;
    var playerColor = req.body.playerColor;

    // check the data
    req.checkBody('playerName', 'Fill in a name!').notEmpty();
    req.checkBody('playerColor', 'Pick a color!').notEmpty();

    // collect errors
    var errors = req.validationErrors();

     if(errors){
       res.render('newPlayer', {title: 'Create a new player', customJs: '/Javascripts/newPlayer.js', errors:errors});
     }
     else
     {
         res.render('gameField', { title: 'new player' ,customJs:'/Javascripts/GameLogic.js', socket: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js'});
     }
});

module.exports = router;

