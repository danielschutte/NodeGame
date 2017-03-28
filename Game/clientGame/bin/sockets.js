/**
 * Created by lenardborn on 16/03/2017.
 */

var socketio = require('socket.io');
var SOCKET_LIST = {};
var PLAYER_LIST ={};
var Player = function (id) {
    var self = {
        x:20,
        y:20,
        id:id,
        number:""+Math.floor(10*Math.random()),
        pressingRight:false,
        pressingLeft:false,
        pressingUp:false,
        pressingDown:false,
        maxSpeed:10,
    }
    self.updatePosition = function () {
        if(self.pressingRight)
            self.x +=self.maxSpeed;
        if(self.pressingLeft)
            self.x -= self.maxSpeed;
        if(self.pressingUp)
            self.y -= self.maxSpeed;
        if(self.pressingDown)
            self.y += self.maxSpeed;
}
    return self;
}
var app = require('../routes/game').app;
var logic = require('./logic');

// all socket server side logic will take place here
module.exports.listen = function(server){

    io = socketio.listen(server);
    io.sockets.on('connection', function(socket){

        socket.id = Math.random();
        SOCKET_LIST[socket.id] = socket;


        var player = Player(socket.id);
        PLAYER_LIST[socket.id] = player;

        console.log('Connected: player'+socket.id);
        socket.on('disconnect',function () {
            console.log('Disconnected: player'+socket.id);
            delete SOCKET_LIST[socket.id];
            delete PLAYER_LIST[socket.id];
        });

        socket.on('keyPress',function (data) {
            if(data.inputId === 'left') //d
                player.pressingLeft = data.state;
            else  if(data.inputId === 'right') //s
                player.pressingRight = data.state;
            else  if(data.inputId === 'up') //a
                player.pressingUp = data.state;
            else  if(data.inputId === 'down') //w
                player.pressingDown = data.state;
        });

        socket.on('data', function(data) {
            console.log("data: name: " + data.playerName + ", color: " + data.playerColor);
        });

    });

    return io;




};
setInterval(function () {
    var pack =[];
    for(var i in PLAYER_LIST) {
        var player = PLAYER_LIST[i];
        player.updatePosition();
        pack.push({
            x: player.x,
            y: player.y,
            number:player.number
        });
    }
    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/25);


