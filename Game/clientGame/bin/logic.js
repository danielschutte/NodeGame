/**
 * Created by lenardborn on 16/03/2017.
 */
//
// // Player Model
// function Player(id, name, color, xPos, yPos){
//     this.id = id;
//     this.name = name;
//     this.xPos = xPos;
//     this.yPos = yPos;
//     this.Color = color;
// }

// Functions
module.exports.createPlayerByName = function(name, color) {
    var player = {
        'name': name,
        'color': color,
        'xPos': 0,
        'yPos': 0
    };

    return player;
};
