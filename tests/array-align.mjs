import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _ARRAY = [1, 5, 2, 5, 3, 2, 4, 5, 6];

function basic(i) {
  var a = _ARRAY;
  var j = 0;
  while (j < a.length) {
    i += a[j];
    i += a[j + 1]
    i += a[j + 2]
    i += a[j + 3]
    j += 4;
  }
}

function cached(i) {
  var a = _ARRAY;
  var length = a.length;
  var j = 0;
  var k;
  while (j < length) {
    i += a[j];
    i += a[j + 1]
    i += a[j + 2]
    i += a[j + 3]
    j += 4;
  }
}

function aligned(i) {
  var a = _ARRAY;
  var length = a.length + 4;
  var j = 0;
  var k;
  while (j < length) {
    i += a[j];
    i += a[j + 1]
    i += a[j + 2]
    i += a[j + 3]
    j += 4;
  }
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
  "basic": basic,
  "cached": cached,
  "aligned": aligned,
});
