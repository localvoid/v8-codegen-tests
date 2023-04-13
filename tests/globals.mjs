import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

var _VAR = 0;
let _LET = 0;
const _OBJ = {
  x: 0,
};

function getVar(i) {
  return _VAR + i;
}
function getLet(i) {
  return _LET + i;
}
function getObj(i) {
  return _OBJ.x + i;
}
function setVar(i) {
  _VAR += i;
}
function setLet(i) {
  _LET += i;
}
function setObj(i) {
  _OBJ.x += i;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(1);
  fn(2);
  fn(3);
  OptimizeFunctionOnNextCall(fn);
  fn(4);
}

run(test, {
  "getVar": getVar,
  "getLet": getLet,
  "getObj": getObj,
  "setVar": setVar,
  "setLet": setLet,
  "setObj": setObj,
});
