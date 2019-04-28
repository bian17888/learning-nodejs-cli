const inquirer = require("inquirer");

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

const CredentialManager = require("../lib/credential-manager");

describe("a credential manager", () => {
  var creds;
  before(() => {
    creds = new CredentialManager("twine-test");
  });

  context("with no exsiting credentials", () => {
    it("should prompt the user", async () => {
      sinon.stub(inquirer, "prompt").resolves({ key: "foo", secret: "bar" });
      let [key, secret] = await creds.getKeyAndSecrect();
      expect(key).to.be.equal("foo");
      expect(secret).to.be.equal("bar");
      inquirer.prompt.restore();
    });
  });

  context("with exsiting credentials", () => {
    it("should return them", async () => {
      let [key, secret] = await creds.getKeyAndSecrect();
      expect(key).to.be.equal("foo");
      expect(secret).to.be.equal("bar");
    });
  });

  after(async () => {
    await creds.cleanKeyAndSecrect();
  });
});
