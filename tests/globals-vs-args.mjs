import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _OBJ = {
  x: 0,
};

function getGlobal(i) {
  return _OBJ.x + i;
}
function getArg(obj, i) {
  return obj.x + i;
}

function setGlobal(i) {
  _OBJ.x += i;
}
function setArg(obj, i) {
  obj.x += i;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  if (fn === setGlobal) {
    for (let i = 0; i < 5; i++) {
      fn(i);
    }
    OptimizeFunctionOnNextCall(fn);
    fn(100);
  } else {
    const obj = { x: 0 };
    for (let i = 0; i < 5; i++) {
      fn(obj, i);
    }
    OptimizeFunctionOnNextCall(fn);
    fn(obj, 100);
  }
}

run(test, {
  "getGlobal": getGlobal,
  "getArg": getArg,
  "setGlobal": setGlobal,
  "setArg": setArg,
});
