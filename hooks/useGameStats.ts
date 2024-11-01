import { useMemo } from "react";

const diceNumberIndex = (diceNumber: number) => diceNumber - 2;
const diceNumber = (index: number) => index + 2;

const EXPECTED_RELATIVE_FREQS = [
  1 / 36,
  2 / 36,
  3 / 36,
  4 / 36,
  5 / 36,
  6 / 36,
  5 / 36,
  4 / 36,
  3 / 36,
  2 / 36,
  1 / 36,
];
const getExpectedAbsoluteFreqs = (numberOfRoll: number) =>
  EXPECTED_RELATIVE_FREQS.map((f) => f * numberOfRoll);

const getAbsoluteFreqs = (diceRolls: number[]) => {
  const res = new Array<number>(11).fill(0);
  diceRolls.forEach((n) => {
    res[diceNumberIndex(n)] += 1;
  });
  return res;
};

const getStats = (absoluteFreqs: number[]) => {
  const totalRolls = absoluteFreqs.reduce((f1, f2) => f1 + f2);

  const relativeFreqs = absoluteFreqs.map((f) => f / totalRolls);

  const maxFreq = Math.max(...absoluteFreqs);
  const normalizedFreqs = absoluteFreqs.map((f) => f / maxFreq);

  const mean = relativeFreqs.reduce((cum, f, i) => cum + f * diceNumber(i), 0);

  const deviations = absoluteFreqs.map((_, i) => diceNumber(i) - mean);
  const standardDeviation =
    deviations.reduce((cum, d, i) => cum + Math.abs(d) * absoluteFreqs[i], 0) /
    totalRolls;
  const variance =
    deviations.reduce((cum, d, i) => cum + d * d * absoluteFreqs[i], 0) /
    totalRolls;

  return {
    totalRolls,
    absoluteFreqs,
    relativeFreqs,
    normalizedFreqs,
    mean,
    standardDeviation,
    variance,
  };
};

const EPS = 0.0000000001;
// some dark magic I copied from https://home.ubalt.edu/ntsbarsh/business-stat/otherapplets/pvalues.htm
// attempt to understand at your own peril
const getChiSquaredPvalue = (x: number, n = 10): number => {
  if (n === 1 && x > 1000) {
    return 0;
  }
  if (x > 1000 || n > 1000) {
    const q = getChiSquaredPvalue(((x - n) * (x - n)) / (2 * n), 1) / 2;
    if (x > n) {
      return q;
    }
    return 1 - q;
  }
  let p = Math.exp(-0.5 * x);
  if (n % 2 === 1) {
    p = p * Math.sqrt((2 * x) / Math.PI);
  }
  let k = n;
  while (k >= 2) {
    p = (p * x) / k;
    k -= 2;
  }
  let t = p;
  let a = n;
  while (t > EPS * p) {
    a += 2;
    t = (t * x) / a;
    p += t;
  }
  return 1 - p;
};

const WARNING_TOLERANCE = 0.1;
const REJECT_TOLERANCE = 0.05;
const chiSquaredTest = (
  actual: number[],
  expected: number[]
): { x: number; pValue: number; status: "ok" | "warning" | "failed" } => {
  const x = actual.reduce((cum, a, i) => {
    const diff = a - expected[i];
    return cum + (diff * diff) / expected[i];
  }, 0);

  const pValue = getChiSquaredPvalue(x, actual.length - 1);

  return {
    x,
    pValue,
    status:
      pValue < REJECT_TOLERANCE
        ? "failed"
        : pValue < WARNING_TOLERANCE
        ? "warning"
        : "ok",
  };
};

export function useGameStats(diceRolls: number[]) {
  const expectedAbsFreqs = useMemo(
    () => getExpectedAbsoluteFreqs(diceRolls.length),
    [diceRolls.length]
  );
  const expected = useMemo(
    () => getStats(expectedAbsFreqs),
    [expectedAbsFreqs]
  );

  const actualAbsFreqs = useMemo(
    () => getAbsoluteFreqs(diceRolls),
    [diceRolls]
  );
  const actual = useMemo(() => getStats(actualAbsFreqs), [actualAbsFreqs]);

  const chiSquared = useMemo(
    () => chiSquaredTest(actualAbsFreqs, expectedAbsFreqs),
    [actualAbsFreqs, expectedAbsFreqs]
  );

  return {
    expected,
    actual,
    chiSquared,
  };
}
