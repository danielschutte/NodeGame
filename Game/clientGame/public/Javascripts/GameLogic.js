/**
 * Created by arjen on 16-3-2017.
 */

 $(document).ready(function(){startGame();});

 function startGame(){
 var myGameArea = document.getElementById("gameview").getContext("2d");
var socket = io.connect('/');
     //var socket = io();
myGameArea.color = "#FF0000";

socket.on('newPositions',function (data) {
    myGameArea.clearRect(0,0,500,500) //check
    for(var i = 0;i < data.player.length; i++){
       myGameArea.fillStyle = data.player[i].color;
    myGameArea.fillText(data.player[i].number,data.player[i].x,data.player[i].y);
    }
    for(var i = 0;i < data.bullet.length; i++)
        myGameArea.fillRect(data.bullet[i].x-5,data.bullet[i].y-5,3,3);

});

     document.onkeydown = function (event) {
         if(event.keyCode === 68) //d
             socket.emit('keyPress',{inputId:'right',state:true});
         else  if(event.keyCode === 83) //s
             socket.emit('keyPress',{inputId:'down',state:true});
         else  if(event.keyCode === 65) //a
             socket.emit('keyPress',{inputId:'left',state:true});
         else  if(event.keyCode === 87) //w
             socket.emit('keyPress',{inputId:'up',state:true});
     }

     document.onkeyup = function (event) {
         if(event.keyCode === 68) //d
             socket.emit('keyPress',{inputId:'right',state:false});
         else  if(event.keyCode === 83) //s
             socket.emit('keyPress',{inputId:'down',state:false});
         else  if(event.keyCode === 65) //a
             socket.emit('keyPress',{inputId:'left',state:false});
         else  if(event.keyCode === 87) //w
             socket.emit('keyPress',{inputId:'up',state:false});
     }
 }



