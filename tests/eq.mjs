import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const T = true;

function bool(i) {
  if (i === true) {
    return 10;
  }
  return 20;
}
function boolConst(i) {
  if (i === T) {
    return 10;
  }
  return 20;
}
function smi(i) {
  if (i > 0) {
    return 10;
  }
  return 20;
}
function Null(i) {
  if (i === null) {
    return 10;
  }
  return 20;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(1);
  fn(0);
  fn(1);
  fn(0);
  OptimizeFunctionOnNextCall(fn);
  fn(1);
}

run(test, {
  "bool": bool,
  "boolConst": boolConst,
  "smi": smi,
  "null": Null,
});
