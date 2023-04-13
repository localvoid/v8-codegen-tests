export function run(exec, tests) {
  const testName = process.env.TEST;
  const test = tests[testName];
  if (!test) {
    throw Error(`Unknown test name '${testName}'`);
  }
  exec(test);
}
