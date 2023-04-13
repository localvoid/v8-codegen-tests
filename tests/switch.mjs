import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

function switchCase5(i) {
  switch (i) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 5;
  }
  return 0;
}

function ifElse5(i) {
  if (i === 0) {
    return 1;
  } else if (i === 1) {
    return 2;
  } else if (i === 2) {
    return 3;
  } else if (i === 3) {
    return 4;
  } else if (i === 4) {
    return 5;
  }
  return 0;
}

function switchCase6(i) {
  switch (i) {
    case 0:
      return 1;
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 4;
    case 4:
      return 5;
    case 5:
      return 5;
  }
  return 0;
}

function ifElse6(i) {
  if (i === 0) {
    return 1;
  } else if (i === 1) {
    return 2;
  } else if (i === 2) {
    return 3;
  } else if (i === 3) {
    return 4;
  } else if (i === 4) {
    return 5;
  } else if (i === 5) {
    return 5;
  }
  return 0;
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
  "switchCase5": switchCase5,
  "ifElse5": ifElse5,
  "switchCase6": switchCase6,
  "ifElse6": ifElse6,
});
