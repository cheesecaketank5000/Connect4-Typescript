import { Board as B, Player as P } from "../board.js";
import { Strategy as S } from "../strategy.js";
const R = (b: B, t: P, p: P): number => {
  let u = t;
  for (;;) {
    const v = b.getValidMoves();
    if (!v.length) return 0.5;
    let c = v[(Math.random() * v.length) | 0];
    for (const k of v) if (b.wouldWin(k, u)) { c = k; break; }
    b.dropPiece(c, u);
    if (b.hasWon(u)) return u === p ? 1 : 0;
    u = u === 1 ? 2 : 1;
  }
};
export class MysteryB extends S {
  readonly name = "Mystery B";
  chooseMove(b: B, p: P): number {
    const o: P = p === 1 ? 2 : 1;
    const v = b.getValidMoves();
    for (const c of v) if (b.wouldWin(c, p)) return c;
    for (const c of v) if (b.wouldWin(c, o)) return c;
    let best = v[0], bs = -1;
    for (const c of v) {
      let s = 0;
      for (let i = 0; i < 120; i++) {
        const n = b.clone(); n.dropPiece(c, p);
        s += n.hasWon(p) ? 1 : R(n, o, p);
      }
      if (s > bs) { bs = s; best = c; }
    }
    return best;
  }
}
