const { Chess } = require("chess.js");
const ChessWebAPI = require("chess-web-api");

module.exports = class Chesster {
  constructor(chessId) {
    this.chessId = chessId;
    this.chessAPI = new ChessWebAPI();
    this.startingChessBoard =
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
  }

  async initialize() {
    if (!this.chessId || this.chessId == "")
      throw new Error("Chess game ID is required");
    this.chessData = await this.chessAPI.getGameByID(this.chessId);
    this.gameData = this.chessData.body.game;
  }

  async getFen() {
    const { startingChessBoard, gameData } = this;
    const chess = new Chess();
    const newChessBoard = new Chess(startingChessBoard);
    chess.loadPgn(gameData.pgn, { sloppy: true });
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
    const { WhiteElo: whiteElo, BlackElo: blackElo } = this.gameData.pgnHeaders;
    return {
      whiteElo,
      blackElo,
    };
  }

  async getPlayerUsernames() {
    const { White: whitePlayer, Black: blackPlayer } = this.gameData.pgnHeaders;
    return {
      whitePlayer,
      blackPlayer,
    };
  }

  async getPlayerData() {
    const { top, bottom } = this.chessData.body.players;
    return { top, bottom };
  }

  async getMoves() {
    const chess = new Chess();
    chess.loadPgn(this.gameData.pgn, { sloppy: true });
    let moves = chess.history();
    return {
      moves,
    };
  }
  async getAverageElo() {
    const { WhiteElo, BlackElo } = this.gameData.pgnHeaders;
    const averageElo = WhiteElo + BlackElo / 2;
    return {
      averageElo,
    };
  }
  async getWinner() {
    const { colorOfWinner } = this.gameData;
    return {
      winner: colorOfWinner ? colorOfWinner : "draw",
    };
  }
  async getResultMessage() {
    const { resultMessage } = this.gameData;
    return {
      resultMessage,
    };
  }

  async getAll() {
    const chess = new Chess();
    const newChessBoard = new Chess(this.startingChessBoard);
    chess.loadPgn(this.gameData.pgn, { sloppy: true });
    let moves = chess.history();
    let fenArray = [];
    for (let move of moves) {
      newChessBoard.move(move);
      fenArray.push(newChessBoard.fen());
    }
    let resultArray = [];
    const splittedMoveTimestamps = this.gameData.moveTimestamps.split(",");
    let formattedTimestampsArray = [];
    const convertSecondsToHMS = (sec) => {
      let sec_num = parseInt(sec, 10) / 10;
      let hours = Math.floor(sec_num / 3600);
      let minutes = Math.floor((sec_num - hours * 3600) / 60);
      let seconds =
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
    const {
      White: whitePlayer,
      Black: blackPlayer,
      WhiteElo: whiteElo,
      BlackElo: blackElo,
    } = this.gameData.pgnHeaders;
    const { top, bottom } = this.chessData.body.players;
    const {
      isAbortable,
      isAnalyzable,
      isCheckmate,
      isStalemate,
      isFinished,
      isRated,
      isResignable,
      colorOfWinner,
      resultMessage,
    } = this.gameData;
    return {
      game: resultArray,
      whitePlayer,
      blackPlayer,
      isAbortable,
      isAnalyzable,
      isCheckmate,
      isStalemate,
      isFinished,
      isRated,
      isResignable,
      whiteElo,
      blackElo,
      resultMessage,
      top,
      bottom,
      averageElo: (whiteElo + blackElo) / 2,
      winner: colorOfWinner ? colorOfWinner : "draw",
    };
  }
};
