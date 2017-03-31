var app = require('../app').app;
var express = require('express');
var logic = require('../bin/logic');
var router = express.Router();

// New player
router.get('/newPlayer', function(req, res, next) {
    res.render('newPlayer', {title: 'Create a new player', 
     customJs: '/Javascripts/newPlayer.js'});
});

// Player has to choose a username and a color, when failed redirect back to newplayer
router.post('/newPlayer', function(req, res, next) {
    var playerName;
    var playerColorName;
    var playerColorHex;

    // get data from fields
    playerName = req.body.playerName;
    playerColorName = req.body.playerColorName;
    playerColorHex = req.body.playerColorHex;

    // check the data
    req.checkBody('playerName', 'Fill in a name!').notEmpty();
    req.checkBody('playerColorHex', 'Pick a color!').notEmpty();

    // collect errors
    var errors = req.validationErrors();

     if(errors){
         // Route back to new player
       res.render('newPlayer', {
            title: 'Create a new player',
            customJs: '/Javascripts/newPlayer.js',
            errors:errors,
            name: playerName,
            colorName: playerColorName,
            colorHex: playerColorHex
        });
     }
     else
     {
        // Route to game
        global.playerName = playerName;
        global.playerColor = playerColorHex;
        res.render('gameField', { 
            title: 'Game',
            customJs:'/Javascripts/GameLogic.js',
            socket: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"
        });
     }
});

module.exports = router;

