/**
 * Created by arjen on 16-3-2017.
 */
var Players =[];

// var player(id, name, color, xPos, yPos)   {
//     this.id = id;
//     this.xPos = xPos;
//     this.yPos = yPos;
//     this.name = name;
// };

//creates new player
function CreateNewPlayer() {
    myGameArea.context.fillRect(10,10,10,10);
   // Players.add(player);
}

function startGame() {

    myGameArea.start();

}



var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}