module.exports = {
  testEnvironment: "./tests/config/test-env.js",
  globalSetup: "./tests/config/global-setup.js",
  globalTeardown: "./tests/config/global-teardown.js",
  testTimeout: 2000,
  coverageProvider: "v8",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
};
