/**
 * Created by arjen on 16-3-2017.
 */
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 640;
canvas.height = 360;


$(document).ready(function () {
	startGame();
});

function startGame() {
	$('#canvasDiv').append(canvas);

	var socket = io.connect('/');

	socket.on('newPositions', function (data) {
		clearMyGameArea();
		for (var i = 0; i < data.player.length; i++) {
			v = new PlayerCreate(data.player[i].number, data.player[i].name, data.player[i].color, data.player[i].x, data.player[i].y)
			v.drawPlayer();
		}
		for (var i = 0; i < data.bullet.length; i++)
			ctx.fillRect(data.bullet[i].x, data.bullet[i].y, 5, 5);
	});

	document.onkeydown = function (event) {

		if (event.keyCode === 68) //d
			socket.emit('keyPress', {
				inputId: 'right',
				state: true
			});
		else if (event.keyCode === 83) //s
			socket.emit('keyPress', {
				inputId: 'down',
				state: true
			});
		else if (event.keyCode === 65) //a
			socket.emit('keyPress', {
				inputId: 'left',
				state: true
			});
		else if (event.keyCode === 87) //w
			socket.emit('keyPress', {
				inputId: 'up',
				state: true
			});
	}

	document.onkeyup = function (event) {
		if (event.keyCode === 68) //d
			socket.emit('keyPress', {
				inputId: 'right',
				state: false
			});
		else if (event.keyCode === 83) //s
			socket.emit('keyPress', {
				inputId: 'down',
				state: false
			});
		else if (event.keyCode === 65) //a
			socket.emit('keyPress', {
				inputId: 'left',
				state: false
			});
		else if (event.keyCode === 87) //w
			socket.emit('keyPress', {
				inputId: 'up',
				state: false
			});

	}

	document.onmousedown = function (event) {
		socket.emit('keyPress', {
			inputId: 'shoot',
			state: true
		});
	}

	document.onmouseup = function (event) {
		socket.emit('keyPress', {
			inputId: 'shoot',
			state: false
		});
	}

	document.onmousemove = function (ctx, event) {

		//var rect = myGameArea.getBoundingClientRect();
		// scaleX = canvas.width / rect.width;
		// scaleY = canvas.height / rect.height;
		// var x = (event.clientX -rect.left) *scaleX ;
		//  var y = (event.clientY- rect.top) *scaleY ;
		var x = ctx.clientX;
		var y = ctx.clientY;
		socket.emit('keyPress', {
			inputId: 'mouseAngle',
			curX: x,
			curY: y
		});
	}


	var myAudio = document.getElementById('soundtrack');
	myAudio.volume = 0.0;

	myAudio.addEventListener('timeupdate', function () {
		var buffer = .35;
		if (this.currentTime > this.duration - buffer) {
			this.currentTime = 0;
			this.play();
		}

	}, false);
	myAudio.play();
}

function clearMyGameArea() {

	var width = canvas.width;
	var height = canvas.height;
	var xoffset = 0;
	var yoffset = 0;

	ctx.clearRect(xoffset, yoffset, width, height);
}

//New object: Player
function PlayerCreate(id, name, color, xPos, yPos) {
	this.id = id;
	this.name = name;
	this.Color = color;
	this.xPosition = xPos;
	this.yPosition = yPos;

	//Local func to draw player on screen
	this.drawPlayer = function () {

		ctx.beginPath();
		ctx.arc(this.xPosition, this.yPosition, 20, 0, 2 * Math.PI, false);
		ctx.lineWidth = 8;
		ctx.strokeStyle = this.Color;
		ctx.stroke();

		ctx.fillStyle = "#ffffff";
		ctx.font = "20px Arial";
		ctx.fillText(this.name, this.xPosition - 20, this.yPosition - 40, 80, 30);

		//Gun following mouse

		ctx.fillStyle = this.Color;
		ctx.fillRect(this.xPosition - 4, this.yPosition, 8, 40);


		// myGameArea.fillStyle = this.Color;
		// myGameArea.fillRect(this.xPosition, this.yPosition, 30, 30);
		// 

	}

}

// function drawInfo(score,health) {
// 	$("")
// }
