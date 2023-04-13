import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const math = Math;

function global(i) {
  return Math.max(0, i);
}
function local(i) {
  return math.max(0, i);
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(1);
  fn(2);
  fn(3);
  OptimizeFunctionOnNextCall(fn);
  fn(4);
}

run(test, {
  "global": global,
  "local": local,
});
