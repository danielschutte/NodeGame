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
    var game = io
    .of('/Game')
    .on('connection', function(socket) {
        console.log('Player connected');
       socket.on('disconnect', function(){
    console.log('user disconnected');
  });
    });
    return io;
};
