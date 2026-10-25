import { Board, Player, COLS, otherPlayer } from "../board.js";
import { Strategy } from "../strategy.js";

export class MyStrategy extends Strategy {
  readonly name = "MyStrategy";

  chooseMove(board: Board, me: Player): number {
    const opponent = otherPlayer(me);
    const validColumns = board.getValidMoves();
    const moves = board.getValidMoves();

    // Check for winning move.
    for (const moves of validColumns) {
      if (board.wouldWin(moves, me)) return moves;
    }

    //Check if opponent would win in each column.
    for (const moves of validColumns) {
      if (board.wouldWin(moves, opponent)) return moves;
    }
    
    // Check for valid moves that would result in the opponent not getting a winning move on the next turn.
    const safe = moves.filter((m) => {
      const next = board.clone();
      next.dropPiece(m, me);
      return !next.getValidMoves().some((n) => next.wouldWin(n, opponent));
    });
    const pool = safe.length ? safe : moves;

    const center = (COLS - 1) / 2;
    //return pool.slice().sort((a, b) => Math.abs(a - center) - Math.abs(b - center))[0];
    
    let best = pool[0];
    let bestScore = -Infinity;
    for (const m of pool) {
      const next = board.clone();
      next.dropPiece(m, me);
      let enemyScore: number = 0;
      const enemyMoves = next.getValidMoves();

      // calculate my score
      const score = this.longestRun(next, me) * 10 - Math.abs(m - center) + Math.random() * 0.5;
      // calculate enemy score
          for (const enemyMove of enemyMoves) {
          const enemyNext = next.clone()
          enemyNext.dropPiece(enemyMove, opponent);
          let currentEnemyScore = this.longestRun(enemyNext, opponent) * 10 - Math.abs(enemyMove - center) + Math.random() * 0.5;
          enemyScore = Math.max(enemyScore, currentEnemyScore)
          }
      // calculate which is the best score from player against bot
      const finalScore = score - enemyScore

      if (finalScore > bestScore) {
        bestScore = finalScore;
        best = m;
      }
    }
    return best;
  }

  private longestRun(board: Board, p: Player): number {
    const g = board.getState();
    let best = 0;
    for (let r = 0; r < g.length; r++) {
      for (let c = 0; c < g[0].length; c++) {
        for (const [dr, dc] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
          let n = 0;
          while (g[r + dr * n]?.[c + dc * n] === p) n++;
          best = Math.max(best, n);
        }
      }
    }
    return best;
  }
  }
    

