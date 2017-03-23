/**
 * Created by arjen on 16-3-2017.
 */
var myGameArea;
var ctx;
var socket = io.connect('/');
var playerWidth = 10;
var playerHeight = 10;
var xPos = 10;
var yPos =10;
//var playerId = 0;
$(document).ready(function(){startGame();});



function startGame() {
    myGameArea = document.getElementById("gameview");
    ctx = myGameArea.getContext("2d");
    //myGameArea.start();
    socket.on('connect',testCon());
}

function testCon() {
   // alert("test");
     CreateNewPlayerx();
}

//creates new player
function CreateNewPlayerx() {
    ctx.fillStyle="#FF0000";
    //place new player random on canvas
    // xPos +=30;
    // yPos +=30;
    ctx.fillRect(xPos, yPos, playerWidth, playerHeight);
    // Players.add(player);
}

//  //players array
// var Players =[];
//
// //player object
// function Player(id, name, color, xPos, yPos){
//   this.id = id;
//   this.name = name;
//   this.xPos = xPos;
//   this.yPos = yPos;
//   this.Color = color;
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
