import { useMemo } from "react";

const diceNumber = (index: number) => index + 2;

const getStats = (diceThrows: number[]) => {
  const absoluteFreqs = new Array<number>(11).fill(0);
  diceThrows.forEach((n) => {
    absoluteFreqs[n - 2] += 1;
  });

  const relativeFreqs = absoluteFreqs.map((f) => f / diceThrows.length);

  const maxFreq = Math.max(...absoluteFreqs);
  const normalizedFreqs = absoluteFreqs.map((f) => f / maxFreq);

  const mean = relativeFreqs.reduce((cum, f, i) => cum + f * diceNumber(i), 0);

  const deviations = absoluteFreqs.map((_, i) => diceNumber(i) - mean);
  const standardDeviation =
    deviations.reduce((cum, d, i) => cum + Math.abs(d) * absoluteFreqs[i], 0) /
    diceThrows.length;
  const variance =
    deviations.reduce((cum, d, i) => cum + d * d * absoluteFreqs[i], 0) /
    diceThrows.length;

  return {
    absoluteFreqs,
    relativeFreqs,
    normalizedFreqs,
    mean,
    standardDeviation,
    variance,
  };
};

const EXPECTED_DICE_THROWS = [
  ...new Array(1).fill(2),
  ...new Array(2).fill(3),
  ...new Array(3).fill(4),
  ...new Array(4).fill(5),
  ...new Array(5).fill(6),
  ...new Array(6).fill(7),
  ...new Array(5).fill(8),
  ...new Array(4).fill(9),
  ...new Array(3).fill(10),
  ...new Array(2).fill(11),
  ...new Array(1).fill(12),
];
const EXPECTED_STATS = getStats(EXPECTED_DICE_THROWS);

export function useGameStats(diceThrows: number[]) {
  const actualStats = useMemo(() => getStats(diceThrows), [diceThrows]);

  return {
    expected: EXPECTED_STATS,
    actual: actualStats,
  };
}
