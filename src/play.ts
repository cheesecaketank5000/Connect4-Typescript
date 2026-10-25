import { playGame } from "./game.js";
import { MyStrategy } from "./strategies/myStrategy.js";
import { AggressiveStrategy } from "./strategies/aggressive.js";
import { DefensiveStrategy } from "./strategies/defensive.js";
import { MysteryA } from "./strategies/mysteryA.js";
import { MysteryB } from "./strategies/mysteryB.js";

const opps = { aggressive: AggressiveStrategy, defensive: DefensiveStrategy, a: MysteryA, b: MysteryB } as const;

const key = (process.argv[2] ?? "defensive") as keyof typeof opps;

const Opp = opps[key] ?? DefensiveStrategy;

const me = new MyStrategy();
const opp = new Opp();

console.log(`X = ${me.name} (moves first), O = ${opp.name}\n`);

const res = playGame(me, opp, (board, player, col) => {
  console.log(`${player === 1 ? "X" : "O"} -> column ${col}\n${board}\n`);
});

console.log(res.winner === 0 ? "Draw." : `Winner: ${res.winner === 1 ? me.name : opp.name}`, res.forfeit ? "(illegal move forfeit)" : "");
