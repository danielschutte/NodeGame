/**
 * Created by lenardborn on 16/03/2017.
 */

var socketio = require('socket.io')

// all socket server side logic will take place here
module.exports.listen = function(server){
    io = socketio.listen(server);

    //users = io.on('/');
    io.on('connection', function(socket){
        console.log('test works');
    });

    return io;
};
