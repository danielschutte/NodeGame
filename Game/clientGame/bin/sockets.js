/**
 * Created by lenardborn on 16/03/2017.
 */
var socketio = require('socket.io');
var SOCKET_LIST = {};

///////////////////////////////////////////////////
////////Model\\\\\\\\\\\\
var Entity = function () {
    var self = {
        x:50,
        y:50,
        speedX:0,
        speedY:0,
        id:"",
    }
    self.update = function () {
        self.updatePosition();
    }
    self.updatePosition = function () {
        self.x += self.speedX;
        self.y += self.speedY;
    }
    return self;
}

///////////////////////////////////////////////////
//////////PLAYER LOGIC\\\\\\\\\\\\\\\\\\
var Player = function (id, name, color) {
    var self = Entity();
        self.id= id;
        self.name=name;
        self.color=color;
        self.number=""+Math.floor(10*Math.random());
        self.pressingRight=false;
        self.pressingLeft=false;
        self.pressingUp=false;
        self.pressingDown=false;
        self.maxSpeed = 2;

        var  super_update = self.update;
        self.update = function () {
            self.updateSpeed();
            super_update();
        }

    self.updateSpeed = function () {
        if(self.pressingRight)
            self.speedX = self.maxSpeed;
        else if(self.pressingLeft)
            self.speedX = -self.maxSpeed;
        else
            self.speedX =0;
        if(self.pressingUp)
            self.speedY = -self.maxSpeed;
        else if(self.pressingDown)
            self.speedY = self.maxSpeed;
        else
            self.speedY =0;
    }
    Player.list[id] = self;
    return self;
}
Player.list = {};
// var name;
// var color;
Player.onConnect = function (socket) {

    // socket.on('data', function(data) {
    //
    //     name = data.playerName;
    //     color = data.playerColor;
    //     console.log("werkt"+ color);
    //
    // });
   // console.log('Connected: player'+socket.id+" kleur:"+color);

    var player = Player(socket.id,global.playerName,global.playerColor);

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
}
Player.onDisconnect = function(socket){
    delete Player.list[socket.id];
}

Player.update = function () {
    var pack =[];
    for(var i in Player.list) {
        var player = Player.list[i];
        player.update();
        pack.push({
            x: player.x,
            y: player.y,
            number:player.number,
            color: player.color,
            name: player.name
        });
    }
    return pack;
}
//////////////////////////////
////////BULLET LOGIC\\\\\\\\\\\\\\\\\\\\\
var Bullet = function (angle) {
    var self = Entity();
    self.id = Math.random();
    self.speedX = Math.cos(angle/180*Math.PI)*10;
    self.speedY = Math.sin(angle/180*Math.PI)*10;

    self.timer = 0;
    self.toRemove = false;
    var super_update = self.update;
    self.update = function () {
        if(self.timer ++> 100)
        {
           self.toRemove = true;
           super_update();

        }
        Bullet.list[self.id] = self;
        return self;
    }
}

Bullet.list = {};
Bullet.update = function () {
    //temp create bullets
    if(Math.random() < 0.1)
    {
        Bullet(Math.random()*360);
    }
    var pack =[];
    for(var i in Bullet.list[i])
    {
        var bullet = Bullet.list[i];
        bullet.update();
        pack.push({
            x:bullet.x,
            y:bullet.y,
        });

    }
    return pack;
}

//     // console.log("data: name: " + data.playerName + ", color: " + data.playerColor);
//     //
//     // var player = Player(socket.id, data.playerName, data.playerColor);
//     // console.log("PLAYER: " + player.name + ", " + player.color + ", " + player.id);
//     //PLAYER_LIST[socket.id] = player;
//
// });

///////////////////////////////////////////////////////////////////
var app = require('../routes/game').app;
var logic = require('./logic');

// all socket server side logic will take place here
module.exports.listen = function(server){

    io = socketio.listen(server);
    io.on('connection', function(socket){

        socket.id = Math.floor((Math.random() * 999999) + 100000);
        SOCKET_LIST[socket.id] = socket;

        Player.onConnect(socket);

        socket.on('disconnect',function () {
            delete SOCKET_LIST[socket.id];
            Player.onDisconnect(socket);
           // console.log('Disconnected: player'+socket.id);
        });

    });
    return io;
};
setInterval(function () {
    var pack = {
        player:Player.update(),
        bullet: Bullet.update()
    }

    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/60);


