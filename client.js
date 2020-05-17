const {spawn} = require('child_process');
const {exec} = require('child_process');

const kill = require('tree-kill');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

let spawnCommand = null;

let cmd = 'ffmpeg';
let args = [
    '-f', 'dshow',
    '-i', 'video=UScreenCapture',
    '-c:v', 'libx264',
    '-f', 'flv', 'rtmp://localhost/live/test'
];

app.get('/', (req, res) => {
    res.sendFile("client.html", {root: __dirname});
});

io.on('connection', (socket) => {
    socket.on("start-streaming", (data) => {
        console.log("it started!");
        spawnCommand = spawn(cmd, args, {stdio: "inherit"});
    });

    socket.on("stop-streaming", (data) => {
        if (spawnCommand != null) {
            console.log('Stopped Streaming!');
            kill(spawnCommand.pid);
        }
    });
});

server.listen(5000);

/*
* ffmpeg -f dshow -i video="UScreenCapture" -c:v libx264 -f flv rtmp://localhost/live/test
*
* */