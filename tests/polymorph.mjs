import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const A = (a, b) => ({ a, b });
const B = (a, b, c) => ({ a, b, c });

function mono(o, fn) {
  const a = o.a;
  if (a === 1 && fn()) {
    return o.b;
  }
  return a + o.b;
}
function poly(o, fn) {
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
  fn(B(0, 3, 4), () => false);
  fn(A(1, 2), () => true);
  fn(B(0, 3, 4), () => false);
  OptimizeFunctionOnNextCall(fn);
  fn(A(1, 2), () => true);
}

run(test, {
  "mono": mono,
  "poly": poly,
});
