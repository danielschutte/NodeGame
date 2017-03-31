
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
             myGameArea.fillRect(data.bullet[i].x , data.bullet[i].y, 5, 5);
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
		socket.emit('keyPress',{inputId:'shoot',state:true});
    }

     document.onmouseup = function (event) {
         socket.emit('keyPress',{inputId:'shoot',state:false});
     }

     document.onmousemove = function (myGameArea,event) {

		//var rect = myGameArea.getBoundingClientRect();
       // scaleX = canvas.width / rect.width;
       // scaleY = canvas.height / rect.height;
      // var x = (event.clientX -rect.left) *scaleX ;
       //  var y = (event.clientY- rect.top) *scaleY ;
		 var x = myGameArea.clientX;
		 var y = myGameArea.clientY;
         socket.emit('keyPress',{inputId:'mouseAngle',curX:x,curY:y});
     }


     var myAudio = document.getElementById('soundtrack');
	myAudio.volume = 0.1;
     myAudio.addEventListener('timeupdate', function() {
         var buffer = .35;
         if(this.currentTime > this.duration - buffer){
             this.currentTime = 0;
             this.play();}

     }, false);
     myAudio.play();

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

		myGameArea.beginPath();
		myGameArea.arc(this.xPosition, this.yPosition, 35, 0, 2 * Math.PI, false);
		myGameArea.lineWidth = 15;
		myGameArea.strokeStyle = this.Color;
		myGameArea.stroke();

        myGameArea.fillStyle = "#ffffff";
        myGameArea.fillText(this.name, this.xPosition + 50, this.yPosition - 10, 80, 30);

		//Gun following mouse

		myGameArea.fillStyle = this.Color;
		myGameArea.fillRect(this.xPosition - 7.5, this.yPosition, 15, 70);


		// myGameArea.fillStyle = this.Color;
		// myGameArea.fillRect(this.xPosition, this.yPosition, 30, 30);
		// myGameArea.font = "20px Arial";

	}

}

(function(){
	var sound = $('#click');
	var form = $('#exitForm');

	$('#exitButton').click(function(){
		sound[0].play();
	});
	sound.on('ended', function(){
		form.submit();
	});
}());

// function drawInfo(score,health) {
// 	$("")
// }

