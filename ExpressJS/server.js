var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());

var messages = [
    { name: "Avinash", message: "Hello from Avinash" },
];



app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', socket => {
    console.log("A new user connected");
});

var server = http.listen(3000, () => {
    console.log("Server is listening to port ", server.address().port);
});
