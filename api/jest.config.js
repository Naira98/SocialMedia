/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  // preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+.[jt]sx?$": ["ts-jest", {}],
  },
  verbose: true,
};
