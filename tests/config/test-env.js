const NodeEnvironment = require("jest-environment-node").TestEnvironment;
const request = require("supertest");
const { app } = require("../../server");

// Jest creates a new test environment for each test suite
class TestEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.config = config;
    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    await super.setup();
    this.global.app = app;
    this.global.request = request;
  }

  async teardown() {
    await super.teardown();
  }

  getVmContext() {
    return super.getVmContext();
  }
}

module.exports = TestEnvironment;
