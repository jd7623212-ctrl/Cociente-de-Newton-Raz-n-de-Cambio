import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateNewtonQuotient,
  calculateSlopeComparison,
  getQuadraticProofSteps,
  calculateCarKinematics,
  calculateMarginalCost,
  calculateBacteriaGrowth,
  PRESET_FUNCTIONS,
} from './math.ts';

test('calculateNewtonQuotient correctly calculates slope for f(x)=x^2', () => {
  const f = (x: number) => x * x;
  // x = 2, h = 1 -> f(2) = 4, f(3) = 9 -> deltaY = 5, slope = 5/1 = 5
  const result = calculateNewtonQuotient(f, 2, 1);
  assert.equal(result.fx, 4);
  assert.equal(result.fxh, 9);
  assert.equal(result.deltaY, 5);
  assert.equal(result.slopeSecant, 5);
});

test('calculateNewtonQuotient approaches tangent slope 2x as h approaches 0', () => {
  const f = (x: number) => x * x;
  const x = 3; // derivative is 2*3 = 6
  const h1 = 1;
  const hSmall = 0.001;

  const res1 = calculateNewtonQuotient(f, x, h1);
  assert.equal(res1.slopeSecant, 7); // (4^2 - 3^2)/1 = 7

  const resSmall = calculateNewtonQuotient(f, x, hSmall);
  // (3.001^2 - 9)/0.001 = 6.001
  assert.ok(Math.abs(resSmall.slopeSecant - 6) < 0.002);
});

test('calculateSlopeComparison verifies error reduction towards 0', () => {
  const quad = PRESET_FUNCTIONS[0];
  const comparison = calculateSlopeComparison(quad.fn, quad.derivative, 2, 0.01);
  assert.equal(comparison.slopeTangent, 4);
  // Secant for x=2, h=0.01 is 2(2) + 0.01 = 4.01
  assert.ok(Math.abs(comparison.slopeSecant - 4.01) < 1e-6);
  assert.ok(comparison.error < 0.02);
});

test('getQuadraticProofSteps returns complete 7 step algebraic proof', () => {
  const steps = getQuadraticProofSteps();
  assert.equal(steps.length, 7);
  assert.equal(steps[0].stepNumber, 1);
  assert.equal(steps[6].stepNumber, 7);
  assert.ok(steps[6].formula.includes('2x'));
});

test('calculateCarKinematics calculates average vs instantaneous velocity', () => {
  // At t=2s, instant velocity = 10*2 = 20 m/s = 72 km/h
  const kin = calculateCarKinematics(2, 1);
  assert.equal(kin.sStart, 20); // 5*(2^2) = 20
  assert.equal(kin.sEnd, 45); // 5*(3^2) = 45
  assert.equal(kin.deltaDistance, 25);
  assert.equal(kin.avgVelocityMs, 25);
  assert.equal(kin.instantVelocityMs, 20);
  assert.equal(kin.instantVelocityKmh, 72);
});

test('calculateMarginalCost accurately computes difference quotient for economy', () => {
  // C(x) = 500 + 20x + 0.1x^2
  // C'(100) = 20 + 0.2(100) = 40
  const econ = calculateMarginalCost(100, 1);
  assert.equal(econ.exactMarginalCost, 40);
  // C(101) - C(100) = 20 + 0.1(201) = 20 + 20.1 = 40.1
  assert.ok(Math.abs(econ.avgMarginalCost - 40.1) < 1e-4);
});

test('calculateBacteriaGrowth computes average vs instant population growth', () => {
  const bio = calculateBacteriaGrowth(2, 1);
  assert.ok(bio.avgGrowthRate > 0);
  assert.ok(bio.exactGrowthRate > 0);
  assert.equal(bio.exactGrowthRate, 100 * (0.5 + 0.16 * 2)); // 100 * 0.82 = 82
});
