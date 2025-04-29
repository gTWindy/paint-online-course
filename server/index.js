const express = require("express");
const app = express();
const WSServer = require('express-ws')(app);
const aWss = WSServer.getWss();
const PORT = process.env.PORT ?? 5000;

app.ws('/', (ws, req) => {
    console.log("All good");
    ws.on('message', (msg) => {
        msg = JSON.parse(msg);
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg);
                break;
        } 
        console.log(msg);
    })
})

const connectionHandler = (ws, msg) => {
    ws.id = msg.id;
    broadcastConnection(msg);
}

const broadcastConnection = (msg) => {
    aWss.clients.forEach(client => {
        if (client.id === msg.id){
            client.send(`Пользователь ${msg.username} подключился`);
        }
    })
}
