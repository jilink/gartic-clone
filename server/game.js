class Game {
  constructor(id, players) {
    this.id = id;
    this.players = players;
    this.numberOfTurns = players.length;
    this.threads = {};
    this.currentTurn = 0;

    for (let i = 0; i < this.numberOfTurns; i++) {
      this.createThreads(i);
    }
  }

  createThreads(turn) {
    // create a turn for each players
    for (const [index, player] of this.players.entries()) {
      if (turn === 0) {
        this.threads[index] = [this.writeTurn(player)];
        continue;
      }
      if (turn % 2) {
        //on of two turns is a drawing one
        this.threads[index].push(this.drawTurn(player));
        continue;
      }
      this.threads[index].push(this.writeTurn(player));
    }

    this.movePlayersLeft();
  }

  writeTurn(player) {
    return {
      playerId: player.id,
      playerName: player.name,
      type: "write",
      data: "",
    };
  }

  drawTurn(player) {
    return {
      playerId: player.id,
      playerName: player.name,
      type: "draw",
      data: "",
    };
  }

  movePlayersLeft() {
    const firstPlayer = this.players.shift();
    this.players.push(firstPlayer);
  }

  getThreads() {
    return this.threads;
  }

  getThreadData(threadId) {
    return this.threads[threadId];
  }

  setTurnData(turn, threadId, data) {
    this.threads[threadId][turn].data = data;
  }

  getTurnData(turn, threadId) {
    return this.threads[threadId][turn];
  }

  getTurnDataById(clientId) {
    const turnData = {
      currentTurn: this.currentTurn,
      numberOfTurns: this.numberOfTurns,
    };
    for (const [key, thread] of Object.entries(this.threads)) {
      if (thread[this.currentTurn].playerId === clientId) {
        turnData.threadId = key
        turnData.data = thread[this.currentTurn]
        if(this.currentTurn > 0) {
          turnData.previousPlayerData = thread[this.currentTurn - 1]
        }
        break;
      }
    }

    return turnData;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }
  getNumberOfTurns() {
    return this.numberOfTurns;
  }

  newTurn() {
    this.currentTurn = this.currentTurn + 1;
  }

  getCurrentTurnData(threadId) {
    return this.getTurnData(this.currentTurn, threadId);
  }

  isAllTurnDataFilled(turn) {
    for (const [key, thread] of Object.entries(this.threads)) {
      if (!thread[turn].data) { // si on a un tour pas rempli on s'arrête
        return false;
      }
    }
    this.newTurn();
    return true; // tous les tours ont été rempli on passe à la suite
  }
}

export default Game;