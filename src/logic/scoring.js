/* Scorecard maths. Pure functions, tested in test/logic.test.js. */

export const EQUAL_WEIGHTS = { trust: 1, embed: 1, data: 1, pay: 1, interest: 1, access: 1 };

export function weightedScore(scores, weights, dims) {
  let total = 0;
  let weightSum = 0;
  for (const d of dims) {
    total += scores[d.key] * weights[d.key];
    weightSum += weights[d.key];
  }
  return total / weightSum;
}

export const hasAllScores = (scores, dims) => dims.every(d => typeof scores[d.key] === "number");

/* Heatmap colour class for a score: s1 (lowest) to s5 (highest). */
export const heatClass = score => `s${Math.min(5, Math.max(1, Math.round(score)))}`;
