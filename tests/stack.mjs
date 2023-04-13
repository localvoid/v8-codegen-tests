import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _CTX = Object.seal({
  stack: [],
  i: 0,
});

function push(t, a, b) {
  const stack = _CTX.stack;
  if (t === true) {
    stack.push(a, b);
  } else {
    stack.pop();
    stack.pop();
  }
}

function index(t, a, b) {
  const stack = _CTX.stack;
  let i = _CTX.i;
  if (t === true) {
    _CTX.i += 2;
    stack[i] = b;
    stack[i + 1] = a;
  } else {
    _CTX.i = i -= 2;
    stack[i + 1] = null;
    stack[i] = null;
  }
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  fn(true, {}, {});
  fn(false);
  fn(true, {}, {});
  fn(false);
  OptimizeFunctionOnNextCall(fn);
  fn(true, {}, {});
}

run(test, {
  "push": push,
  "index": index,
});
