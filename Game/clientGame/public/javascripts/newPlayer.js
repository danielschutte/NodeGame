/**
 * Created by dschutte on 16-03-17.
 */

var colors = {"colors" : [
    {"id" : 0, "name":"green", "hex":"#7CFC00"},
    {"id" : 1,"name":"red", "hex":"#ff0000"},
    {"id" : 2,"name":"blue", "hex":"#0000ff"},
    {"id" : 3,"name":"yellow", "hex":"#ffff00"},
    {"id" : 4,"name":"pink", "hex":"#ff00ce"}
]};


$(function(){
    $.each(colors.colors, function(i, item){
        $('#colorList').append('<li id='+item.id+' style="color:'+item.hex+'" onclick="setColor()">'+item.name+'</li>');
    });
});





function dropDown(click){
    var x = document.getElementById("dropDown");
    x.classList.toggle("change");
}

function setColor(click){
    var x = document.getElementById("selectedColor");
    $("#selectedColor").empty();
    var y = document.getElementById(click.id);
    x.append();
}