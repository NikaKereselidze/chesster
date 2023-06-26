# Chesster

## Introduction

> Do you want to access chess.com API data easily? Chesster is a great solution for that. You can retrieve any kind of data with just 1 function.



## Code Samples
Initialize Chesster instance

```js
const chess = new Chesster("123456789"); // Pass in the game id for e.g: https://www.chess.com/game/live/123456789
await chess.initialize(); // Initialize chess instance to retrieve game data
```

## Example of use

```js
const fen = await chess.getFen();
```

## List of functions


| Functions  | Description |
| ------------- | ------------- |
| `getFen()`  | Get fen (A *FEN* string consists of six fields, separated by spaces. Each field provides specific information about the position)  |
| `getMoves()`  | Get moves  |
| `getWinner()`  | Get winner of the chess game  |
| `getResultMessage()`  | Get result message of the chess game |
| `getElo()`  | Get players elo of the chess game  |
| `getPlayerUsernames()`  | Get players usernames of the chess game  |
| `getPlayerData()`  | Get players data of the chess game (top and bottom side)  |
| `getAverageElo()` | Get average elo of both players  |
| `getAll()`  | Get all data (black and white player's elo, their average elo, moves and fens with timestamps, winner and result message and etc)  |

## Installation

NPM:

```
npm install chesster
```

Yarn:

```
yarn add chesster
```
