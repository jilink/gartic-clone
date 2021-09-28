class Game {
  constructor(id, players) {
    this.id = id;
    this.players = players;
    this.numberOfTurns = players.length;
    this.threads = {};

    for (let i = 0; i < this.numberOfTurns; i++) {
      this.createThreads(i);
    }

    console.log(this.getTurnData(1, 2))
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
      type: "write",
      data: "",
    };
  }

  drawTurn(player) {
    return {
      playerId: player.id,
      type: "draw",
      data: "",
    };
  }

  movePlayersLeft() {
    const firstPlayer = this.players.shift();
    this.players.push(firstPlayer);
    console.log("players", this.players);
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
}

export default Game;
