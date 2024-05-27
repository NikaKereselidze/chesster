
<img width="894" alt="chesster" src="https://github.com/NikaKereselidze/chesster/assets/71851989/a059bae4-7bac-4013-a39a-545fe7b6bd9c">
<p align="center" style="margin: 0px auto; margin-top: 15px; max-width: 600px">
    <a href="https://npmjs.com/package/chesster"><img src="https://img.shields.io/npm/v/chesster"></a>
    <a href="#"><img src="https://img.shields.io/npm/dt/chesster"/></a>
</p>

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
| `getFen()`  | Fetch fen (A *FEN* string consists of six fields, separated by spaces. Each field provides specific information about the position)  |
| `getMoves()`  | Fetch moves  |
| `getPGN()`  | Fetch PGN  |
| `getWinner()`  | Fetch winner of the chess game  |
| `getResultMessage()`  | Fetch result message of the chess game |
| `getElo()`  | Fetch players elo of the chess game  |
| `getPlayerUsernames()`  | Fetch players usernames of the chess game  |
| `getPlayerData()`  | Fetch players data of the chess game (top and bottom side)  |
| `getAverageElo()` | Fetch average elo of both players  |
| `getAll()`  | Fetch all data (black and white player's elo, their average elo, moves and fens with timestamps, winner and result message and etc)  |

## Installation

NPM:

```
npm install chesster
```

Yarn:

```
yarn add chesster
```
