const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 4001;
const index = require("./routes/index");
const { makeid } = require("./utils");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  },
});

let interval;

const state = {};
const clientRooms = {};

io.on("connection", (client) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  client.on("disconnect", handleQuitGame);

  client.on("createGame", handleNewGame);
  client.on("joinGame", handleJoinGame);

  client.on("startGame", handleStartGame);

  function handleNewGame(playerName) {
    let roomName = makeid(5)
    clientRooms[client.id] = roomName;
    client.emit('gameCode', roomName)
    state[roomName] = {players : [{name: playerName, id: client.id}]};
    client.join(roomName);
    emitGameState(roomName, state[roomName])
  };

  function handleJoinGame(data) {
    const roomName = data.id;
    const playerName = data.name;
    clientRooms[client.id] = roomName;
    client.join(roomName);
    if (!state[roomName]) return;
    state[roomName].players.push({name: playerName, id: client.id});
    emitGameState(roomName, state[roomName])
  }
  function handleQuitGame() {
    console.log("a client as left")
    const roomName = clientRooms[client.id];
    if (!roomName) return;
    if (!state[roomName]) return;
    state[roomName].players = state[roomName].players.filter(
      (item) => item.id !== client.id
    );

    client.leave(roomName);
    emitGameState(roomName, state[roomName])
  }

  function handleStartGame() {
    const roomName = clientRooms[client.id];
    io.sockets.in(roomName).emit('gameStart');
    // state[roomName] = {players : [{name: playerName, id: client.id}]};
    // emitGameState(roomName, state[roomName])
  };
})

function emitGameState(room, gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room)
    .emit('gameState', JSON.stringify(gameState));
}


server.listen(port, () => console.log(`Listening on port ${port}`));
