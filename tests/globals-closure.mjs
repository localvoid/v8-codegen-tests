/**
 * Wrapping into a factory prevents from Function Context Specializations.
 */

import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

var _VAR = 0;
let _LET = 0;
const _OBJ = {
  x: 0,
};

function mkGetVar() {
  return function getVar(i) {
    return _VAR + i;
  };
}
const getVar = mkGetVar();

function mkGetLet() {
  return function getLet(i) {
    return _LET + i;
  };
}
const getLet = mkGetLet();

function mkGetObj() {
  return function getObj(i) {
    return _OBJ.x + i;
  }
}
const getObj = mkGetObj();

function mkSetVar() {
  return function setVar(i) {
    _VAR += i;
  };
}
const setVar = mkSetVar();

function mkSetLet() {
  return function setLet(i) {
    _LET += i;
  };
}
const setLet = mkSetLet();

function mkSetObj() {
  return function setObj(i) {
    _OBJ.x += i;
  };
}
const setObj = mkSetObj();

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
