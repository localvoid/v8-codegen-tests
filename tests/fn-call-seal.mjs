import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

let _x = 0;
const _fn = () => _x++;
const _seal = Object.seal(() => _x++);

function basic(i) {
  return _fn.call(void 0, i);
}
function seal(i) {
  return _seal.call(void 0, i);
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(1);
  fn(2);
  fn(3);
  fn(4);
  OptimizeFunctionOnNextCall(fn);
  fn(5);
}

run(test, {
  "basic": basic,
  "seal": seal,
});
