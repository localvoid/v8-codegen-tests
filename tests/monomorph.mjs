import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const A = (a, b) => ({ a, b });

function basic(o, fn) {
  const a = o.a;
  if (a === 1 && fn()) {
    return o.b;
  }
  return a + o.b;
}

function cached(o, fn) {
  const a = o.a;
  const b = o.b;
  if (a === 1 && fn()) {
    return b;
  }
  return a + b;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(A(1, 2), () => true);
  fn(A(1, 2), () => false);
  fn(A(1, 2), () => true);
  fn(A(1, 2), () => false);
  OptimizeFunctionOnNextCall(fn);
  fn(A(1, 2), () => false);
}

run(test, {
  "basic": basic,
  "cached": cached,
});
