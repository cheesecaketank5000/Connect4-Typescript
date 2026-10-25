# Connect Four Bots (Node.js + TypeScript)

A command-line Connect Four game where two bots play each other. The game engine, scorer and opponents are in place, and the bot in `src/strategies/myStrategy.ts` is the one being developed. The goal is a win rate of at least 50% over 100 matches against each opponent.

## Commands
```
npm install
npm run score              # 100 matches vs each of the 4 opponents (takes ~1 min)
npm run play -- defensive  # watch one game (aggressive | defensive | a | b)
npm run typecheck
```

## Layout
| File | What it is |
| --- | --- |
| `src/board.ts` | `Board` class: `getState()`, `getValidMoves()`, `dropPiece()`, `wouldWin()`, `clone()`, `hasWon()` |
| `src/strategy.ts` | abstract `Strategy` class every bot extends |
| `src/strategies/myStrategy.ts` | the bot under development |
| `src/strategies/aggressive.ts` | opponent 1: wins when it can, otherwise builds its longest line |
| `src/strategies/defensive.ts` | opponent 2: wins, blocks, avoids giving a win, prefers the center |
| `src/strategies/mysteryA.ts`, `mysteryB.ts` | opponents 3 and 4 |
| `src/game.ts`, `src/score.ts`, `src/play.ts` | game loop, scorer, single-game viewer |

The board is 6 rows by 7 columns. `grid[0]` is the top row. Pieces are `1` or `2`, and empty cells are `0`. A bot receives a copy of the board, so it can `clone()` and simulate moves freely. Returning an illegal column forfeits the game.
