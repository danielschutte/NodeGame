/**
 * Created by lenardborn on 16/03/2017.
 */

var socketio = require('socket.io');
var SOCKET_LIST = {};

///////////////////////////////////////////////////
////////Model\\\\\\\\\\\\
var Entity = function () {
    var self = {
        x:250,
        y:250,
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
    
    self.getDistance = function (point) {
        return Math.sqrt(Math.pow(self.x-point.x,2) + Math.pow(self.y-point.y,2));
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
        self.pressingShoot = false;
        self.mouseX = 0;
        self.mouseY = 0;
        self.mouseAngle = 90;
        self.maxSpeed = 2;
        self.health = 10;
        self.timer = 0;
        self.coolDownTimer = 0;
        self.score =0;
        var  super_update = self.update;
        self.update = function () {
            self.updateSpeed();
            super_update();
            self.mouseAngle = Math.atan2(self.mouseY - (self.y)  ,  self.mouseX - (self.x)) * 180 / Math.PI;
            if(self.pressingShoot){
                if(self.timer++ < 1){
                self.shoot(self.mouseAngle);
                console.log("x="+self.mouseX+"  y="+self.mouseY+" player x="+self.x +"  player y="+ self.y);
                    console.log(self.mouseAngle);
                } else if(self.coolDownTimer++ > 10){
                    self.timer = 0;
                    self.coolDownTimer = 0;
                }
            }
        }
        
        self.shoot = function (angle) {
            var bullet = Bullet(self.id,angle);
            bullet.x = self.x;
            bullet.y = self.y;
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
        else if(data.inputId === 'shoot')
            player.pressingShoot = data.state;
        else if(data.inputId === 'mouseAngle'){
            player.mouseX = data.curX;
            player.mouseY = data.curY;

        }

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
            name: player.name,
            score: player.score,
            health: player.health
        });
    }
    return pack;
}
//////////////////////////////
////////BULLET LOGIC\\\\\\\\\\\\\\\\\\\\\
var Bullet = function(parent,angle){
    var self = Entity();
    self.id = Math.random();
    self.speedX = Math.cos(angle/180*Math.PI) * 10;
    self.speedY = Math.sin(angle/180*Math.PI) * 10;
    self.parent = parent;
    self.timer = 0;
    self.toRemove = false;
    var super_update = self.update;
    self.update = function(){
        if(self.timer++ > 100)
            self.toRemove = true;
        super_update();

        for(var i in Player.list)
        {
            var p = Player.list[i];
            if(self.getDistance(p) <32 && self.parent !== p.id){
                //handle collision
                self.parent.score +=1;
                self.toRemove = true;
            }

        }
    }
    Bullet.list[self.id] = self;
    return self;
}
Bullet.list = {};

Bullet.update = function(){
    var pack = [];
    for(var i in Bullet.list){
        var bullet = Bullet.list[i];
        bullet.update();
        if(bullet.toRemove)
        {
            delete  Bullet.list[i];
        } else{
        pack.push({
            x:bullet.x,
            y:bullet.y,
        });
        }
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
    io.sockets.on('connection', function(socket){

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
        bullet:Bullet.update(),
    }

    for(var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions',pack);
    }
},1000/60);


