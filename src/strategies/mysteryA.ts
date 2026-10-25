import { Board as B, Player as P } from "../board.js";
import { Strategy as S } from "../strategy.js";
const W = [3, 4, 5, 7, 5, 4, 3];
const e = (b: B, p: P): number => {
  const g = b.getState();
  let s = 0;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) { if (g[r][c] === p) s += W[c]; else if (g[r][c]) s -= W[c]; }
  const L = (q: P) => {
    let t = 0;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) for (const [a, d] of [[0, 1], [1, 0], [1, 1], [1, -1]]) {
      let n = 0, z = 0;
      for (let k = 0; k < 4; k++) { const v = g[r + a * k]?.[c + d * k]; if (v === q) n++; else if (v === 0) z++; else { n = -9; break; } }
      if (n === 3 && z === 1) t += 50; else if (n === 2 && z === 2) t += 8;
    }
    return t;
  };
  return s + L(p) - L(p === 1 ? 2 : 1);
};
const m = (b: B, d: number, a: number, be: number, x: boolean, p: P): number => {
  const o: P = p === 1 ? 2 : 1, me = x ? p : o;
  if (b.hasWon(p)) return 1e5 + d;
  if (b.hasWon(o)) return -1e5 - d;
  const v = b.getValidMoves();
  if (!d || !v.length) return e(b, p);
  v.sort((q, w) => Math.abs(q - 3) - Math.abs(w - 3));
  let r = x ? -Infinity : Infinity;
  for (const c of v) {
    const n = b.clone(); n.dropPiece(c, me);
    const s = m(n, d - 1, a, be, !x, p);
    if (x) { r = Math.max(r, s); a = Math.max(a, r); } else { r = Math.min(r, s); be = Math.min(be, r); }
    if (a >= be) break;
  }
  return r;
};
export class MysteryA extends S {
  readonly name = "Mystery A";
  chooseMove(b: B, p: P): number {
    let best = -1, bs = -Infinity;
    const v = b.getValidMoves().sort((q, w) => Math.abs(q - 3) - Math.abs(w - 3));
    for (const c of v) {
      const n = b.clone(); n.dropPiece(c, p);
      const s = m(n, 4, -Infinity, Infinity, false, p);
      if (s > bs) { bs = s; best = c; }
    }
    return best;
  }
}
