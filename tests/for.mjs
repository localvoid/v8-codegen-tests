import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _ARRAY1 = [1, 5, 2, 5, 3, 2, 4, 5, 6];
const _ARRAY2 = [1, 5, 2, 5, 3, 2, 4, 5];

function a(arr) { }
function b(arr) { }

function basic(arr, fn) {
  let r = 0;
  for (let i = 0; i < arr.length; i++) {
    r += arr[i];
    fn(arr);
  }
  return r;
}

function cached(arr, fn) {
  let r = 0;
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    r += arr[i];
    fn(arr);
  }
  return r;
}

function forOf(arr, fn) {
  let r = 0;
  for (const i of arr) {
    r += i;
    fn(arr);
  }
  return r;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(_ARRAY1, a);
  fn(_ARRAY2, b);
  fn(_ARRAY1, a);
  OptimizeFunctionOnNextCall(fn);
  fn(_ARRAY2, b);
}

run(test, {
  "basic": basic,
  "cached": cached,
  "forOf": forOf,
});
