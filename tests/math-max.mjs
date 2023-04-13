import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _1 = new Float32Array([0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0]);
const _2 = new Float32Array([0.0, 1.0, 2.0, 3.0]);
const _max = Math.max;

function basic(arr) {
  var r0 = 0.0;
  for (var i = 0; i < arr.length; i++) {
    r0 = Math.max(arr[i], r0);
  }
  return r0;
}

function cached(arr) {
  var r0 = 0.0;
  for (var i = 0; i < arr.length; i++) {
    r0 = _max(arr[i], r0);
  }
  return r0;
}

function inline(arr) {
  var r0 = 0.0;
  for (var i = 0; i < arr.length; i++) {
    r0 = r0 > arr[i] ? r0 : arr[i];
  }
  return r0;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(_1);
  fn(_2);
  fn(_1);
  OptimizeFunctionOnNextCall(fn);
  fn(_2);
}

run(test, {
  "basic": basic,
  "cached": cached,
  "inline": inline,
});
