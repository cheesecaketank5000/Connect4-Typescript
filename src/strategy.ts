import { Board, Player } from "./board.js";

export abstract class Strategy {
  abstract readonly name: string;

  abstract chooseMove(board: Board, me: Player): number;
}
