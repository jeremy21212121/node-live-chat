var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/client', function(req, res){
  res.sendFile(__dirname + '/public/client.html');
});

app.get('/staff', function(req, res){
  res.sendFile(__dirname + '/public/staff.html');
});

let adminId = null

const staffNS = io.of('/staff')
const clientNS = io.of('/client')

/**
 * 
 * ChatEvent {
 *   to: String,
 *   ?from: String,
 *   message: String
 * }
 * 
 */

staffNS.on('connection', function(socket) {
  adminId = socket.id

  socket.on('chatEvent', function(chatEvent) {
    // console.log('chat event on staff')
    if (chatEvent.to === 'staff') {
      staffNS.emit('chatEvent', chatEvent)
    } else {
      // console.log('bridge message')
      clientNS.in(chatEvent.to).emit('chatEvent', chatEvent)
    }
  })

  socket.on('connectionEvent', function(id) {
    staffNS.emit('chatEvent', { to: 'staff', from: id, message: `New connection from ${id}` })
  })

  socket.on('disconnect', function() {
    adminId = null
  })
})

clientNS.on('connection', function(socket) {
  staffNS.emit('connectionEvent', socket.id)

  socket.on('chatEvent', function(chatEvent) {
    chatEvent.from = socket.id
    staffNS.emit('chatEvent', chatEvent)
  })

})

http.listen(port, '0.0.0.0', function(){
  console.log('listening on *:' + port);
});
