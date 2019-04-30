const chai = require("chai");
const expect = chai.expect;
const util = require("../../lib/util");

describe("the util modole", () => {
  context("the notEmpty function", () => {
    it("should return true when given a string ", () => {
      const result = util.notEmpty("hello");
      expect(result).to.be.true();
    });
    it("should return an error when given an empty string ", () => {
      const result = util.notEmpty("");
      expect(result).to.equal("The value is required");
    });
  });
});
