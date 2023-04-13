import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

function basic(i) {
  if (i & 1) {
    return 10;
  }
  return 20;
}
function strictEq(i) {
  if ((i & 1) === 1) {
    return 10;
  }
  return 20;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(0);
  fn(1);
  fn(0);
  fn(1);
  OptimizeFunctionOnNextCall(fn);
  fn(0);
}

run(test, {
  "basic": basic,
  "strictEq": strictEq,
});
