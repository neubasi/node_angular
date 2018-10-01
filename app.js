console.log("Node wird gestartet");

/* 
    Einrichtung http Server zum Hosten der Angular App
*/
const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = 4500;

app.use(express.static(__dirname + '/dist/material1'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);
server.listen(port, () => console.log("Running http Server"));


/* 
    Beispieldaten
*/
setInterval(() => {
    console.log("Node.js wird ausgeführt")
    /*
    data = { name: 'Ein Simon', datum: new Date() }
    */
   data =  [
    {position: 1, name: 'Hydrogen', weight: 1.0079, date: new Date()},
    {position: 2, name: 'Helium', weight: 4.0026, date: new Date()},
    {position: 3, name: 'Lithium', weight: 6.941, date: new Date()},
    {position: 4, name: 'Beryllium', weight: 9.0122, date: new Date()},
    {position: 5, name: 'Boron', weight: 10.811, date: new Date()},
    {position: 6, name: 'Carbon', weight: 12.0107, date: new Date()},
    {position: 7, name: 'Nitrogen', weight: 14.0067, date: new Date()},
    {position: 8, name: 'Oxygen', weight: 15.9994, date: new Date()},
    {position: 9, name: 'Fluorine', weight: 18.9984, date: new Date()},
    {position: 10, name: 'Neon', weight: 20.1797, date: new Date()},
  ]
}, 1000);

/* 
    Einrichtung Wrbsocket Server
*/
const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 4400 });

/* 
    Websocket Initalisierung
*/
ws.on('connection', (ws) => {
    console.log("Connection Websocket")
    ws.on('message', (message) => {
        console.log('received: %s', message);
        ws.send(JSON.stringify(data));
    });
});


/* 
    Funktion zum Senden an alle Clients
*/
function broadcast() {
    ws.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            console.log("Heartbeat")
            client.send(JSON.stringify(data));
        }
    });
}

setInterval(() => {
    broadcast();
}, 1000);





