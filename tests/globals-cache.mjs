import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _OBJ = {
  x: 0,
  y: 0,
};

function x() {
  _OBJ.y = 1;
  return 1;
}
function y() {
  _OBJ.y = 2;
  return 2;
}

function get(fn, i) {
  return _OBJ.x + fn() + _OBJ.y + i;
}
function getCached(fn, i) {
  var c = _OBJ;
  return c.x + fn() + c.y + i;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(x, 1);
  fn(y, 2);
  fn(x, 3);
  OptimizeFunctionOnNextCall(fn);
  fn(y, 4);
}

run(test, {
  "get": get,
  "getCached": getCached,
});
