export type Player = 1 | 2;

export type Cell = 0 | Player;

export const ROWS = 6;
export const COLS = 7;

export const otherPlayer = (p: Player): Player => (p === 1 ? 2 : 1);

export class Board {
  private grid: Cell[][];

  constructor(grid?: Cell[][]) {
    this.grid = grid ?? Array.from({ length: ROWS }, () => Array<Cell>(COLS).fill(0));
  }

  getState(): Cell[][] {
    return this.grid.map((row) => [...row]);
  }

  clone(): Board {
    return new Board(this.getState());
  }

  getValidMoves(): number[] {
    const moves: number[] = [];
    for (let c = 0; c < COLS; c++) {
      if (this.grid[0][c] === 0) moves.push(c);
    }
    return moves;
  }

  isValidMove(col: number): boolean {
    return Number.isInteger(col) && col >= 0 && col < COLS && this.grid[0][col] === 0;
  }

  dropPiece(col: number, player: Player): number {
    if (!this.isValidMove(col)) throw new Error(`Illegal move: column ${col}`);

    for (let r = ROWS - 1; r >= 0; r--) {
      if (this.grid[r][col] === 0) {
        this.grid[r][col] = player;
        return r;
      }
    }
    throw new Error("unreachable");
  }

  isFull(): boolean {
    return this.getValidMoves().length === 0;
  }

  hasWon(player: Player): boolean {
    const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        for (const [dr, dc] of dirs) {
          let n = 0;
          while (n < 4) {
            const rr = r + dr * n, cc = c + dc * n;
            if (rr < 0 || rr >= ROWS || cc < 0 || cc >= COLS || this.grid[rr][cc] !== player) break;
            n++;
          }
          if (n === 4) return true;
        }
      }
    }
    return false;
  }

  wouldWin(col: number, player: Player): boolean {
    if (!this.isValidMove(col)) return false;
    const copy = this.clone();
    copy.dropPiece(col, player);
    return copy.hasWon(player);
  }

  toString(): string {
    const sym = { 0: ".", 1: "X", 2: "O" } as const;
    const rows = this.grid.map((row) => row.map((c) => sym[c]).join(" "));
    return rows.join("\n") + "\n" + Array.from({ length: COLS }, (_, i) => i).join(" ");
  }
}
