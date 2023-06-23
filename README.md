# Chesster

## Introduction

> Do you want to access chess.com API data easily? Chesster is a great solution for that. You can retrieve any kind of data with just 1 function.

## Code Samples

Initialize Chesster instance

```js
const chess = new Chesster("123456789"); // Pass in the game id for e.g: https://www.chess.com/game/live/123456789
```

Get fen

```js
const fen = chess.getFen();
```

Get moves

```js
const moves = chess.getMoves();
```

Get winner of the chess game

```js
const winner = chess.getWinner();
```

Get result message of the chess game

```js
const resultMessage = chess.getResultMessage();
```

Get players elo of the chess game

```js
const elo = chess.getElo();
```

Get players usernames of the chess game

```js
const playerUsernames = chess.getPlayerUsernames();
```

Get players data of the chess game (top and bottom side)

```js
const playerData = chess.getPlayerData();
```

Get average elo of both players

```js
const averageElo = chess.getAverageElo();
```

Get all data (black and white player's elo, their average elo, moves and fens with timestamps, winner and result message and etc)

```js
const all = chess.getAll();
```

## Installation

NPM:

```
npm install chesster
```

Yarn:

```
yarn add chesster
```
