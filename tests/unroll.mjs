import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _1 = new Float32Array([0.0, 1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0]);
const _2 = new Float32Array([0.0, 1.0, 2.0, 3.0]);

function basic(arr) {
  var r0 = 0.0;
  for (var i = 0; i < arr.length; i++) {
    r0 += arr[i];
  }
  return r0;
}

function unroll(arr) {
  var r0 = 0.0;
  var r1 = 0.0;
  var r2 = 0.0;
  var r3 = 0.0;
  for (var i = 0; (i + 4) < arr.length; i += 4) {
    r0 = arr[i] + r0;
    r1 = arr[i + 1] + r1;
    r2 = arr[i + 2] + r2;
    r3 = arr[i + 3] + r3;
  }
  return r0 + r1 + r2 + r3;
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
  "unroll": unroll,
});
