import { Board, Player } from "./board.js";
import { Strategy } from "./strategy.js";

export interface GameResult {
  winner: Player | 0;
  moves: number;
  forfeit?: Player;
}

export function playGame(
  p1: Strategy,
  p2: Strategy,
  onMove?: (board: Board, player: Player, col: number) => void,
): GameResult {
  const board = new Board();

  const bots: Record<Player, Strategy> = { 1: p1, 2: p2 };
  let turn: Player = 1;
  let moves = 0;

  while (!board.isFull()) {
    const col = bots[turn].chooseMove(board.clone(), turn);

    if (!board.isValidMove(col)) return { winner: turn === 1 ? 2 : 1, moves, forfeit: turn };

    board.dropPiece(col, turn);
    moves++;
    onMove?.(board, turn, col);

    if (board.hasWon(turn)) return { winner: turn, moves };

    turn = turn === 1 ? 2 : 1;
  }

  return { winner: 0, moves };
}
