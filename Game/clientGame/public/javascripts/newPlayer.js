/**
 * Created by dschutte on 16-03-17.
 */

var colors = {"colors" : [
    {"name":"green", "hex":"hexcode"},
    {"name":"red", "hex":"hexcode"},
    {"name":"blue", "hex":"hexcode"}
]};

$.each(colors, function(i, item){
    $('#colorList').append('<li>'+item.name+'</li>')
});



function dropDown(click){
    var x = document.getElementById("dropDown");
    x.classList.toggle("change");
}