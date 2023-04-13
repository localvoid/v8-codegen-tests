import { PrepareFunctionForOptimization, OptimizeFunctionOnNextCall } from "../v8.mjs";
import { run } from "../test.mjs";

const _BASIC = { x: 1, y: 2, z: 3 };
const _PACKED = { x: 1 | (2 << 10) | (3 << 20) };

function basic(i) {
  var basic = _BASIC;
  return basic.x + basic.y + basic.z + i;
}
function packed(i) {
  var x = _PACKED.x;
  return (x & 1) + ((x >> 10) & 7) + ((x >> 20) & 7) + i;
}

function test(fn) {
  PrepareFunctionForOptimization(fn);
  _BASIC.x++;
  _BASIC.y++;
  _BASIC.z++;
  _PACKED.x++;
  fn(0);
  _BASIC.x++;
  _BASIC.y++;
  _BASIC.z++;
  _PACKED.x++;
  fn(1);
  _BASIC.x++;
  _BASIC.y++;
  _BASIC.z++;
  _PACKED.x++;
  fn(2);
  _BASIC.x++;
  _BASIC.y++;
  _BASIC.z++;
  _PACKED.x++;
  OptimizeFunctionOnNextCall(fn);
  fn(3);
}

run(test, {
  "basic": basic,
  "packed": packed,
});
