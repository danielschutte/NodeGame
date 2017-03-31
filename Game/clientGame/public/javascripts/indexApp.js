(function(){

    var sound = $('#click');

    sound.on("ended", function(){
        location.href = "./Game/NewPlayer";
        })


    $('#startButton').click(function(){
        sound[0].play();
    });

}());

