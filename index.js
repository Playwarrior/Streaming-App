const nodeMediaServer = require('node-media-server');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, "/")));

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 30,
        ping_timeout: 60
    },
    http: {
        port: 8000,
        allow_origin: '*'
    }
};

var nms = new nodeMediaServer(config);

nms.run();

app.get('/', (req, res) => {
   res.sendFile("index.html");
});

app.listen(8080);




