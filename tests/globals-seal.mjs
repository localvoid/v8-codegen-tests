import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _OBJ = {
  x: 0,
  y: 0,
};
const _SEAL = Object.seal({
  x: 0,
  y: 0,
});

function basic(fn, i) {
  return _OBJ.x + fn() + _OBJ.y + i;
}
function seal(fn, i) {
  return _SEAL.x + fn() + _SEAL.y + i;
}

function mutObj() {
  _OBJ.y += 1;
  return _OBJ.x;
}
function mutSeal() {
  _SEAL.y += 1;
  return _SEAL.x;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(mutObj, 1);
  fn(mutSeal, 2);
  fn(mutObj, 3);
  fn(mutSeal, 4);
  OptimizeFunctionOnNextCall(fn);
  fn(mutObj, 5);
}

run(test, {
  "basic": basic,
  "seal": seal,
});
