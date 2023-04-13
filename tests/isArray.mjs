import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _Array = Array;
const _isArray = _Array.isArray;

function isArray(i) {
  if (_isArray(i)) {
    return 10;
  }
  return 20;
}
function instanceOf(i) {
  if (i instanceof _Array) {
    return 10;
  }
  return 20;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn([]);
  fn([]);
  fn([]);
  fn([]);
  OptimizeFunctionOnNextCall(fn);
  fn([]);
}

run(test, {
  "isArray": isArray,
  "instanceof": instanceOf,
});
