import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _ObjectIs = Object.is;

function strictEq(i) {
  if (i === true) {
    return 10;
  }
  return 20;
}
function objectIs(i) {
  if (_ObjectIs(i, true)) {
    return 10;
  }
  return 20;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(1);
  fn(0);
  fn(1);
  fn(0);
  OptimizeFunctionOnNextCall(fn);
  fn(1);
}

run(test, {
  "strictEq": strictEq,
  "objectIs": objectIs,
});
