/**
 * Created by lenardborn on 16/03/2017.
 */

var socketio = require('socket.io');
var SOCKET_LIST = {};
var app = require('../routes/game').app;
var logic = require('./logic');


// all socket server side logic will take place here
module.exports.listen = function(server){

    io = socketio.listen(server);
    io.sockets.on('connection', function(socket){

        socket.id = Math.random();
        socket.x = 0;
        socket.y = 0;
        SOCKET_LIST[socket.id] = socket;
        console.log('test works'+socket.id);
    });

    return io;
};
setInterval(function () {
    var pack =[];
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.x++;
        socket.y++;
        pack.push({
            x: socket.x,
            y: socket.y
        });
    }
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);

