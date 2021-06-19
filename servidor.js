const express = require('express');
const http = require('http');
const app = express();
const servidor = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(servidor);

io.on('connection', socket => {
  
  let nombre;

  socket.on('conectado', (name)=> {
    nombre = name;
    socket.broadcast.emit('mensajes',{nombre, mensaje:`${nombre} ha entrado a la sala`});
  });

  socket.on('mensaje',(nombre,mensaje) => {
    io.emit('mensajes',{nombre,mensaje});
  });

  socket.on('disconnect', () => {
    io.emit('mensajes',{servidor:"servidor",nombre, mensaje:`${nombre} ha abandonado la sala`});
  })

});

servidor.listen(5000,  () => {
  console.log('servidor inicializado')
})