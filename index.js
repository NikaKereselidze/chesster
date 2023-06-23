const { Chess } = require("chess.js");
const ChessWebAPI = require("chess-web-api");

module.exports = class Chesster {
  constructor(chessId) {
    this.chessId = chessId;
  }

  async getFen() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);

    const chess = new Chess();
    const newChessBoard = new Chess(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    chess.loadPgn(resp.body.game.pgn, { sloppy: true });
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
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    const whiteElo = resp.body.game.pgnHeaders.WhiteElo;
    const blackElo = resp.body.game.pgnHeaders.BlackElo;
    return {
      whiteElo,
      blackElo,
    };
  }

  async getPlayerUsernames() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    return {
      whitePlayer: resp.body.game.pgnHeaders.White,
      blackPlayer: resp.body.game.pgnHeaders.Black,
    };
  }

  async getPlayerData() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    return {
      topPlayer: resp.body.players.top,
      bottomPlayer: resp.body.players.bottom,
    };
  }

  async getMoves() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);

    const chess = new Chess();
    chess.loadPgn(resp.body.game.pgn, { sloppy: true });
    let moves = chess.history();
    return {
      moves,
    };
  }
  async getAverageElo() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    const whiteElo = resp.body.game.pgnHeaders.WhiteElo;
    const blackElo = resp.body.game.pgnHeaders.BlackElo;
    const averageElo = whiteElo + blackElo / 2;
    return {
      averageElo,
    };
  }
  async getWinner() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    return {
      winner: resp.body.game.colorOfWinner
        ? resp.body.game.colorOfWinner
        : "draw",
    };
  }
  async getResultMessage() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    return {
      resultMessage: resp.body.game.resultMessage,
    };
  }

  async getAll() {
    const chessAPI = new ChessWebAPI();
    const resp = await chessAPI.getGameByID(this.chessId);
    const whiteElo = resp.body.game.pgnHeaders.WhiteElo;
    const blackElo = resp.body.game.pgnHeaders.BlackElo;
    const averageElo = whiteElo + blackElo / 2;

    const chess = new Chess();
    const newChessBoard = new Chess(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    );
    chess.loadPgn(resp.body.game.pgn, { sloppy: true });
    let moves = chess.history();
    let fenArray = [];
    for (let move of moves) {
      newChessBoard.move(move);
      fenArray.push(newChessBoard.fen());
    }
    let resultArray = [];
    const splittedMoveTimestamps = resp.body.game.moveTimestamps.split(",");
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
      whitePlayer: resp.body.game.pgnHeaders.White,
      blackPlayer: resp.body.game.pgnHeaders.Black,
      isAbortable: resp.body.game.pgnHeaders.isAbortable,
      isAnalyzable: resp.body.game.pgnHeaders.isAnalyzable,
      isCheckMate: resp.body.game.pgnHeaders.isCheckMate,
      isStalemate: resp.body.game.pgnHeaders.isStalemate,
      isFinished: resp.body.game.pgnHeaders.isFinished,
      isRated: resp.body.game.pgnHeaders.isRated,
      isResignable: resp.body.game.pgnHeaders.isResignable,
      whiteElo,
      blackElo,
      averageElo,
      winner: resp.body.game.colorOfWinner
        ? resp.body.game.colorOfWinner
        : "draw",
      resultMessage: resp.body.game.resultMessage,
    };
  }
};
