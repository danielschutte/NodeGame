/**
 * Created by dschutte on 16-03-17.
 *
 */

// function startOnClick(){
//     document.getElementById('explosion').play();
//     location.href = "./game/newPlayer";
//
// }



// $('#start').click(function(){
//     playSound(function() {
//         alert("werkt");
//         //location.href = "./game/newPlayer";
//     })
// });
//
// var playSound = function(callback) {
//     document.getElementById('explosion').play(callback);
// }

(function(){

    var sound = $('#click');

    sound.on("ended", function(){
        location.href = "./Game/NewPlayer";
        })


    $('#startButton').click(function(){
        sound[0].play();
    });

}());

