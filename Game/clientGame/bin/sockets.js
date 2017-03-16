/**
 * Created by lenardborn on 16/03/2017.
 */

var socketio = require('socket.io');
var logic = require('./logic');

// all socket server side logic will take place here
module.exports.listen = function(server){
    io = socketio.listen(server);

    io.on('connection', function(socket) {
        var test = logic.createPlayerByName('lenard', 'lenard');
        console.log('Hallo '+ test.name);
    });

    return io;
};
