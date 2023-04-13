import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _ARRAY = [0, 1, 2, 3];
const _STRING = "abcd";

function array(i) {
  return _ARRAY[i];
}
function string(i) {
  return _STRING.charCodeAt(i);
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(0);
  fn(1);
  fn(2);
  OptimizeFunctionOnNextCall(fn);
  fn(3);
}

run(test, {
  "array": array,
  "string": string,
});
