const { Chess } = require("chess.js");
const ChessWebAPI = require("chess-web-api");

module.exports = class Chesster {
  constructor(chessId) {
    this.chessId = chessId;
    this.chessAPI = new ChessWebAPI();
  }

  async initialize() {
    this.chessData = await this.chessAPI.getGameByID(this.chessId);
  }

  async getFen() {
    const chess = new Chess();
    const newChessBoard = new Chess(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    chess.loadPgn(this.chessData.body.game.pgn, { sloppy: true });
    let moves = chess.history();
    let fenArray = [];
    for (let move of moves) {
      newChessBoard.move(move);
      fenArray.push(newChessBoard.fen());
    }
    return {
      fen: fenArray,
    };
  }

  async getElo() {
    return {
      whiteElo: this.chessData.body.game.pgnHeaders.WhiteElo,
      blackElo: this.chessData.body.game.pgnHeaders.BlackElo,
    };
  }

  async getPlayerUsernames() {
    return {
      whitePlayer: this.chessData.body.game.pgnHeaders.White,
      blackPlayer: this.chessData.body.game.pgnHeaders.Black,
    };
  }

  async getPlayerData() {
    return {
      topPlayer: this.chessData.body.players.top,
      bottomPlayer: this.chessData.body.players.bottom,
    };
  }

  async getMoves() {
    const chess = new Chess();
    chess.loadPgn(this.chessData.body.game.pgn, { sloppy: true });
    let moves = chess.history();
    return {
      moves,
    };
  }
  async getAverageElo() {
    const whiteElo = this.chessData.body.game.pgnHeaders.WhiteElo;
    const blackElo = this.chessData.body.game.pgnHeaders.BlackElo;
    const averageElo = whiteElo + blackElo / 2;
    return {
      averageElo,
    };
  }
  async getWinner() {
    return {
      winner: this.chessData.body.game.colorOfWinner
        ? this.chessData.body.game.colorOfWinner
        : "draw",
    };
  }
  async getResultMessage() {
    return {
      resultMessage: this.chessData.body.game.resultMessage,
    };
  }

  async getAll() {
    const chess = new Chess();
    const newChessBoard = new Chess(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    chess.loadPgn(this.chessData.body.game.pgn, { sloppy: true });
    let moves = chess.history();
    let fenArray = [];
    for (let move of moves) {
      newChessBoard.move(move);
      fenArray.push(newChessBoard.fen());
    }
    let resultArray = [];
    const splittedMoveTimestamps =
      this.chessData.body.game.moveTimestamps.split(",");
    let formattedTimestampsArray = [];
    const convertSecondsToHMS = (seconds) => {
      var sec_num = parseInt(seconds, 10) / 10;
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds =
        Math.round((sec_num - hours * 3600 - minutes * 60) * 10) / 10;

      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return hours + ":" + minutes + ":" + seconds;
    };
    for (let j = 0; j < splittedMoveTimestamps.length; j++) {
      formattedTimestampsArray.push(
        convertSecondsToHMS(splittedMoveTimestamps[j])
      );
    }

    for (let i = 0; i < fenArray.length; i++) {
      resultArray.push({
        fen: fenArray[i],
        move: moves[i],
        time: formattedTimestampsArray[i],
        moveBy: i % 2 == 0 ? "white" : "black",
      });
    }
    return {
      game: resultArray,
      whitePlayer: this.chessData.body.game.pgnHeaders.White,
      blackPlayer: this.chessData.body.game.pgnHeaders.Black,
      isAbortable: this.chessData.body.game.isAbortable,
      isAnalyzable: this.chessData.body.game.isAnalyzable,
      isCheckMate: this.chessData.body.game.isCheckmate,
      isStalemate: this.chessData.body.game.isStalemate,
      isFinished: this.chessData.body.game.isFinished,
      isRated: this.chessData.body.game.isRated,
      isResignable: this.chessData.body.game.isResignable,
      whiteElo: this.chessData.body.game.pgnHeaders.WhiteElo,
      blackElo: this.chessData.body.game.pgnHeaders.BlackElo,
      averageElo:
        (this.chessData.body.game.pgnHeaders.WhiteElo +
          this.chessData.body.game.pgnHeaders.BlackElo) /
        2,
      winner: this.chessData.body.game.colorOfWinner
        ? this.chessData.body.game.colorOfWinner
        : "draw",
      resultMessage: this.chessData.body.game.resultMessage,
    };
  }
};
