
/**
 * Created by arjen on 16-3-2017.
 */

 $(document).ready(function(){startGame();});
var myGameArea;
 function startGame() {
      myGameArea = document.getElementById("gameview").getContext("2d");
     var socket = io.connect('/');

     myGameArea.height = window.innerHeight;
     myGameArea.width = window.innerWidth;
     myGameArea.canvas.height = window.innerHeight;
     myGameArea.canvas.width = window.innerWidth;

     socket.on('newPositions', function (data) {
         clearMyGameArea();
         for (var i = 0; i < data.player.length; i++) {
             v = new PlayerCreate(data.player[i].number, data.player[i].name, data.player[i].color, data.player[i].x, data.player[i].y)
             v.drawPlayer();
         }
         for (var i = 0; i < data.bullet.length; i++)
             myGameArea.fillRect(data.bullet[i].x - 5, data.bullet[i].y - 5, 3, 3);
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
}

function clearMyGameArea() {
	var width = myGameArea.width;
	var height = myGameArea.height;
	var xoffset = 0;
	var yoffset = 0;

	myGameArea.clearRect(xoffset, yoffset, width, height);
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
		myGameArea.fillStyle = this.Color;
		myGameArea.fillRect(this.xPosition, this.yPosition, 30, 30);
		myGameArea.font = "20px Arial";
		myGameArea.fillStyle = "#000";
		myGameArea.fillText(this.name, this.xPosition - 10, this.yPosition - 10, 80, 30);
	}
}

