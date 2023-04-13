import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const T = true;

function explicit(i) {
  if (i === true) {
    return 10;
  }
  return 20;
}
function implicit(i) {
  if (i) {
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
  "explicit": explicit,
  "implicit": implicit,
});
