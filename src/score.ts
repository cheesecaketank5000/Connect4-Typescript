import { playGame } from "./game.js";
import { Strategy } from "./strategy.js";
import { MyStrategy } from "./strategies/myStrategy.js";
import { AggressiveStrategy } from "./strategies/aggressive.js";
import { DefensiveStrategy } from "./strategies/defensive.js";
import { MysteryA } from "./strategies/mysteryA.js";
import { MysteryB } from "./strategies/mysteryB.js";

const MATCHES = 100;
const TARGET = 0.5;

const opponents: Strategy[] = [new AggressiveStrategy(), new DefensiveStrategy(), new MysteryA(), new MysteryB()];

let allPassed = true;
console.log(`Scoring MyStrategy: ${MATCHES} matches vs each opponent (alternating who moves first)\n`);

for (const opp of opponents) {
  const me = new MyStrategy();
  let wins = 0, losses = 0, draws = 0;

  for (let i = 0; i < MATCHES; i++) {
    const iGoFirst = i % 2 === 0;

    const res = iGoFirst ? playGame(me, opp) : playGame(opp, me);

    const myNumber = iGoFirst ? 1 : 2;

    if (res.winner === 0) draws++;
    else if (res.winner === myNumber) wins++;
    else losses++;
  }

  const rate = wins / MATCHES;
  const pass = rate >= TARGET;
  if (!pass) allPassed = false;

  console.log(
    `${opp.name.padEnd(12)} W${wins} L${losses} D${draws}  win rate ${(rate * 100).toFixed(0)}%  ${pass ? "PASS" : "FAIL"}`,
  );
}

console.log(allPassed ? "\nAll opponents beaten at >=50%." : "\nNot there yet.");
process.exitCode = allPassed ? 0 : 1;
