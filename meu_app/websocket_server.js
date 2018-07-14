var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/tela.html');
})

app.get('/controle', (req, res) => {
    res.sendFile(__dirname + '/controle.html');
})

io.on('connection', (socket) => {
    socket.on('sendPosition', (positions) => {
        io.emit('setPosition', positions)
    })
})

http.listen(PORT, () => {
    console.log('Running on port ' + PORT);
})