import { Board, Player, COLS, otherPlayer } from "../board.js";
import { Strategy } from "../strategy.js";

export class MyStrategy extends Strategy {
  readonly name = "MyStrategy";

  chooseMove(board: Board, me: Player): number {
    const foe = otherPlayer(me);
    const moves = board.getValidMoves();

    for (const m of moves) if (board.wouldWin(m, me)) return m;

    for (const m of moves) if (board.wouldWin(m, foe)) return m;

    const safe = moves.filter((m) => {
      const next = board.clone();
      next.dropPiece(m, me);
      return !next.getValidMoves().some((n) => next.wouldWin(n, foe));
    });

    const pool = safe.length ? safe : moves;
    
    let best = pool[0];
    let bestScore = -Infinity;
    
    for (const m of pool) {
      const next = board.clone();
      next.dropPiece(m, me);
      const score = this.longestRun(next, me) * 10 - Math.abs(m - (COLS - 1) / 2) + Math.random() * 0.5;

      if (score > bestScore) {
        bestScore = score;
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
