"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const db_1 = require("./db");
const routing_controllers_1 = require("routing-controllers");
const Koa = require("koa");
const http_1 = require("http");
const IO = require("socket.io");
const app = new Koa();
const server = new http_1.Server(app.callback());
exports.io = IO(server);
const port = process.env.PORT || 4000;
routing_controllers_1.useKoaServer(app, {
    cors: true,
    controllers: [],
});
exports.io.on('connection', function (socket) {
    console.log(`User ${socket.id} just connected`);
    socket.on('movePlayer1', state => {
        exports.io.emit('playerOneMoved', state);
    });
    socket.on('movePlayer2', state => {
        exports.io.emit('playerTwoMoved', state);
    });
    socket.on('updatePuckMove', state => {
        exports.io.emit('puckHasMoved', state);
    });
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} just disconnected`);
    });
});
db_1.default()
    .then(_ => server.listen(port, () => console.log(`Listening on server port ${port}`)))
    .catch(err => console.error(err));
//# sourceMappingURL=index.js.map