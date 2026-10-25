import { Board, Player, COLS, otherPlayer } from "../board.js";
import { Strategy } from "../strategy.js";

export class DefensiveStrategy extends Strategy {
  readonly name = "Defensive";

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

    const center = (COLS - 1) / 2;
    return pool.slice().sort((a, b) => Math.abs(a - center) - Math.abs(b - center))[0];
  }
}
