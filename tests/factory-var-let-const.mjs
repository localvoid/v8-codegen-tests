import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

let g = 0;

function __var(i) {
  return function _var() {
    return g + i;
  }
}

function __let(i) {
  let j = i;
  return function _let() {
    return g + j;
  }
}

function __const(i) {
  const j = i;
  return function _const() {
    return g + j;
  }
}

function test(fn) {
  const fn1 = fn(1);
  const fn2 = fn(2);
  PrepareFunctionForOptimization(fn1);
  PrepareFunctionForOptimization(fn1);
  fn1();
  fn2();
  fn1();
  fn2();
  OptimizeFunctionOnNextCall(fn1);
  OptimizeFunctionOnNextCall(fn2);
  fn1();
  fn2();
}

run(test, {
  "_var": __var,
  "_let": __let,
  "_const": __const,
});
