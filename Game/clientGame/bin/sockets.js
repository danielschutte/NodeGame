/**
 * Created by lenardborn on 16/03/2017.
 */

var socketio = require('socket.io');
var app = require('../routes/game').app;
var logic = require('./logic');

// all socket server side logic will take place here
module.exports.listen = function(server){

    io = socketio.listen(server);

    //var players = [];
    io.on('connection', function(socket) {
        console.log('het werkt ');
        // if(app.locals.player){
        //     var player = app.locals.player;
        //     app.locals.player = null;
        //     players.add(player);
        //     console.log(players);
        // }
    });
    return io;
};
