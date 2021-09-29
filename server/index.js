import 'dotenv/config';
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { default: Game } = require("./game");

const index = require("./routes/index");
const { makeid } = require("./utils");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.origin,
    credentials: true
  },
});

let interval;

const state = {};
const clientRooms = {};

io.on("connection", (client) => {
  const testPlayers = [{name: 'mark', id: 'sdfosdf'}, {name: 'jksh', id: 's12fosdf'}, {name: 'dfsdfark', id: 'sddf'}, {name: 'john', id: 'sdfosdf654654'}, {name: 'markus', id: 'sdfosdf4654'}, ]
  new Game("id", testPlayers)
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  client.on("disconnect", handleQuitGame);

  client.on("createGame", handleNewGame);
  client.on("joinGame", handleJoinGame);

  client.on("startGame", handleStartGame);
  client.on("setTurnData", handleSetTurnData);

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
    state[roomName].game = new Game(roomName, state[roomName].players)
    // state[roomName] = {players : [{name: playerName, id: client.id}]};
    emitGameState(roomName, state[roomName])
    emitTurnStart(roomName, state[roomName].game)
  };

  function handleSetTurnData(data) {
    const roomName = clientRooms[client.id];
    state[roomName].game.setTurnData(data.currentTurn, data.threadId, data.data)
    if (state[roomName].game.isAllTurnDataFilled(data.currentTurn)) {
      const game = state[roomName].game
      if (game.currentTurn === game.numberOfTurns)  { // it's equal because we are one turn too far already
        console.log("Game reveal !")
        emitGameState(roomName, state[roomName])
        emitGameReveal(roomName)
      } else {
        emitTurnStart(roomName, game)
        console.log("ok c'est bon tour suivant")
      }
    } else {
      console.log("les autres ont pas finit")
    }
  };
})

function emitTurnStart(room, game) {
  // Send this event to everyone in the room with specific data for each id
  const clients = io.sockets.adapter.rooms.get(room);
  for (const clientId of clients) {
    const client = io.sockets.sockets.get(clientId);
    client.emit("turnStart", JSON.stringify(game.getTurnDataById(clientId)));
  }
}

function emitGameState(room, gameState) {
  // Send this event to everyone in the room.
  io.sockets.in(room).emit("gameState", JSON.stringify(gameState));
}

function emitGameReveal(room) {
  // Send this event to everyone in the room.
  io.sockets.in(room).emit("gameReveal")
}

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
