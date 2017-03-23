/**
 * Created by arjen on 16-3-2017.
 */

var ctx;
var localPlayer;
var socket = io.connect('/');
var playerWidth = 10;
var playerHeight = 10;
var myGameArea;

$(document).ready(function () {
	startGame();
});


function startGame() {
	myGameArea = document.getElementById("gameview");
	myGameArea.height = window.innerHeight;
	myGameArea.width = window.innerWidth;

	ctx = myGameArea.getContext("2d");
	socket.on('connect', testCon());

	window.addEventListener("keydown", doKeyDown, true);
}

function testCon() {
	createLocalPlayer();
}

//creates new player
function createLocalPlayer() {
	var localPlayerID = Math.random;
	localPlayer = new Player(localPlayerID, "Garret", "#FF0000", 50, 40);
	localPlayer.drawPlayer();
}

//New object: Player
function Player(id, name, color, xPos, yPos) {
	this.id = id;
	this.name = name;
	this.Color = color;
	this.xPosition = xPos;
	this.yPosition = yPos;

	//Local func to draw player on screen
	this.drawPlayer = function () {

		//Clear area before rendering player
		clearMyGameArea();

		ctx.fillStyle = this.Color;
		ctx.fillRect(this.xPosition, this.yPosition, 30, 30);
		ctx.font = "20px Arial";
		ctx.fillStyle = "#FFF";
		ctx.fillText(this.name, this.xPosition - 10, this.yPosition - 10, 80, 30);
	}
}

function clearMyGameArea() {
	var width = myGameArea.width;
	var height = myGameArea.height;
	var xoffset = 0;
	var yoffset = 0;

	ctx.clearRect(xoffset, yoffset, width, height);
}

function doKeyDown(e) {
	const speed = 10;
	if (e.keyCode == 68) //KEY D 
	{
		localPlayer.xPosition += speed;
		localPlayer.drawPlayer();
	}
	if (e.keyCode == 65) //KEY A 
	{
		localPlayer.xPosition -= speed;
		localPlayer.drawPlayer();
	}
	if (e.keyCode == 83) //KEY S 
	{
		localPlayer.yPosition += speed;
		localPlayer.drawPlayer();
	}
	if (e.keyCode == 87) //KEY W 
	{
		localPlayer.yPosition -= speed;
		localPlayer.drawPlayer();
	}

}


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
