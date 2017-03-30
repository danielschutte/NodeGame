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
    var submit;
    var playerName;
    var playerColor 

    // get data from fields
    playerName = req.body.playerName;
    playerColor = req.body.playerColor;
    submit = req.body.submit;

    // check the data
    req.checkBody('playerName', 'Fill in a name!').notEmpty();
    req.checkBody('playerColor', 'Pick a color!').notEmpty();

    // collect errors
    var errors = req.validationErrors();

     if(errors){
         // Route back to new player
       res.render('newPlayer', {
            title: 'Create a new player',
            customJs: '/Javascripts/newPlayer.js',
            errors:errors,
            name: playerName,
            color: playerColor,
            submit: submit
        });
     }
     else
     {
        // Route to game
        global.playerName = playerName;
        global.playerColor = playerColor.hex;
        res.render('gameField', { 
            title: 'Game',
            customJs:'/Javascripts/GameLogic.js',
            socket: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"
        });
     }
});

module.exports = router;

