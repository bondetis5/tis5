
const express = require('express');
const app = express();



const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server);

var usuariosOnline = [];
io.on('connection', function(socket) {
    console.log(socket.id);
   

    socket.on('INICIALIZA', function(data) {
        io.emit('USERONLINE', usuariosOnline);
    });

    socket.on('USERONLINE', function(data) {
        usuariosOnline.push(data.user);
        io.emit('USERONLINE', usuariosOnline);
    });
    
    socket.on('USEROFF', function(data) {
        var index = usuariosOnline.indexOf(data.user);
        usuariosOnline.splice(index, 1);
        io.emit('USERONLINE', usuariosOnline);
    });
});
