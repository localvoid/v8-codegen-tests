import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

function basic(i) {
  if (i) {
    return 10;
  }
  return 20;
}
function strictEq(i) {
  if (i === true) {
    return 10;
  }
  return 20;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(true);
  fn(false);
  fn(true);
  fn(false);
  OptimizeFunctionOnNextCall(fn);
  fn(true);
}

run(test, {
  "basic": basic,
  "strictEq": strictEq,
});
