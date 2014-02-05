var express = require('express');
var app = express();
var port = 3700;
var io = require('socket.io').listen(app.listen(port));

// Settings
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get('/', function(req, res) {
  res.render('layout');
});



// Routes
app.get('/', function(req, res) {
  res.send('working');
});

// Connect to server via Socket.io
io.sockets.on('connection', function(socket) {
  socket.emit('message', { message: 'Welcome to our chat' });
  socket.on('send', function(data) {
    io.sockets.emit('message', data);
  });
});

console.log('Listening on port ' + port);
