/**
 * Created by arjen on 16-3-2017.
 */

 $(document).ready(function(){startGame();});
// var ctx;
// var localPlayer;
// var socket = io.connect('/');
// var playerWidth = 10;
// var playerHeight = 10;
// var Game = { };
//
//
// $(document).ready(function () {
// 	startGame();
// });

// Game.fps = 50;
//
// Game.run = function() {
//    clearMyGameArea();
//    localPlayer.drawPlayer();
// };
//
// // Start the game loop
// Game._intervalId = setInterval(Game.run, 1000 / Game.fps);


 function startGame(){
 var myGameArea = document.getElementById("gameview").getContext("2d");
var socket = io.connect('/');
     //var socket = io();
myGameArea.color = "#FF0000";

socket.on('newPositions',function (data) {
    myGameArea.clearRect(0,0,500,500) //check
    for(var i = 0;i < data.length; i++)
    myGameArea.fillText(data[i].number,data[i].x,data[i].y);
});
 }

 document.onkeydown = function (event) {
     if(event.keyCode ===68) //d
         socket.emit('keyPress',{inputId:'right',state:true});
 }


// var ctx;

// var playerWidth = 10;
// var playerHeight = 10;
// var xPos = 10;
// var yPos =10;
// var player;
//
// //var playerId = 0;
// $(document).ready(function(){startGame();});
// // socket.onconnect('msg',onMessage);
// //
// // function onMessage(text) {
// //     $("#messageFromServer").appendChild(text);
// //
// // }
// function startGame() {
//     myGameArea = document.getElementById("gameview");
//     ctx = myGameArea.getContext("2d");
//     //myGameArea.start();
//     socket.on('connect',testCon());
// }
//
// function testCon() {
//    // alert("test");
//      CreateNewPlayerx();
// }
//
// //creates new player
// function CreateNewPlayerx() {
//     player = new Object();
//     player.x = xPos;
//     player.y = yPos;
//     ctx.fillStyle="#FF0000";
//     //place new player random on canvas
//     // xPos +=30;
//     // yPos +=30;
//     ctx.fillRect(xPos, yPos, playerWidth, playerHeight);
//     // Players.add(player);
//     socket.emit('playerCreated');
// }
//
// var Bullet = function (angle) {
//     var self = Entity();
//     self.id = Math.random();
//     self.speedX = Math.cos(angle/180*Math.PI)*10;
//     self.speedY = Math.sin(angle/180*Math.PI)*10;
//
//     self.timer = 0;
//     self.toRemove = false;
//     var super_update = self.update;
//     self.update = function () {
//         if(self.timer ++> 100)
//         {
//            self.toRemove = true;
//            super_update();
//
//         }
//         Bullet.list[self.id] = self;
//         return self;
//     }
// }
// Bullet.list = {};
// Bullet.update = function () {
//     if(Math.random() < 0.1)
//     {
//         Bullet(Math.random()*360);
//     }
//     var pack =[];
//     for(var i in Bullet.list[i])
//     {
//         var bul = Bullet.list[i];
//         bullet.update();
//         pack.push({
//             x:bullet.x,
//             y:bullet.y,
//         });
//
//     }
//     return pack;
// }
//
// setInterval(function () {
//     var pack = {
//         player:Player.update(),
//         bullet:Bullet.update(),
//     }
// },1000/25);

// function startGame() {
// 	myGameArea = document.getElementById("gameview");
// 	myGameArea.height = window.innerHeight;
// 	myGameArea.width = window.innerWidth;
//
// 	ctx = myGameArea.getContext("2d");
// 	socket.on('connect', testCon());
//
// 	window.addEventListener("keydown", doKeyDown, true);
// }
//
// function testCon() {
// 	createLocalPlayer();
// }
//
// //creates new player
// function createLocalPlayer() {
// 	var localPlayerID = Math.random;
// 	localPlayer = new Player(localPlayerID, "Garret", "#FF0000", 50, 40);
// 	localPlayer.drawPlayer();
// }
// >>>>>>> fab7143cfaa862921df0f1fea02356b528d3e30b
//
// //New object: Player
// function Player(id, name, color, xPos, yPos) {
// 	this.id = id;
// 	this.name = name;
// 	this.Color = color;
// 	this.xPosition = xPos;
// 	this.yPosition = yPos;
//
// 	//Local func to draw player on screen
// 	this.drawPlayer = function () {
// 		ctx.fillStyle = this.Color;
// 		ctx.fillRect(this.xPosition, this.yPosition, 30, 30);
// 		ctx.font = "20px Arial";
// 		ctx.fillStyle = "#FFF";
// 		ctx.fillText(this.name, this.xPosition - 10, this.yPosition - 10, 80, 30);
// 	}
// }
//
// function clearMyGameArea() {
// 	var width = myGameArea.width;
// 	var height = myGameArea.height;
// 	var xoffset = 0;
// 	var yoffset = 0;
//
// 	ctx.clearRect(xoffset, yoffset, width, height);
// }
//
// function doKeyDown(e) {
// 	const speed = 10;
// 	if (e.keyCode == 68) //KEY D
// 	{
// 		localPlayer.xPosition += speed;
// 	}
// 	if (e.keyCode == 65) //KEY A
// 	{
// 		localPlayer.xPosition -= speed;
// 	}
// 	if (e.keyCode == 83) //KEY S
// 	{
// 		localPlayer.yPosition += speed;
// 	}
// 	if (e.keyCode == 87) //KEY W
// 	{
// 		localPlayer.yPosition -= speed;
// 	}
//
// }


//
// //creates new player
// function CreateNewPlayerx() {
//     myGameArea.context.fillRect(10, 10, 10, 10);
//     // Players.add(player);
// }
// function CreateNewPlayer(name) {
//     var xPos = random();
//     var yPos = random();
//     var color = '#' + Math.random().toString(16).substr(-6);
//     var name = name;
//     var id = Players.length + 1;
//     Players.add(player(this.id, this.name, this.color, this.xPos, this.yPos));
// }
//
// //Initialize game
// function startGame() {
//     myGameArea.start();
//     CreateNewPlayer(name)
// }
//
//
//
// var myGameArea = {
//     canvas : document.createElement("canvas"),
//     start : function() {
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext("2d");
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.frameNo = 0;
//         this.interval = setInterval(updateGameArea, 20);
//
//     },
//     clear : function() {
//         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//     }
// }
