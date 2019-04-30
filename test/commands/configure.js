const path = require("path");
const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const dirtyChai = require("dirty-chai");
const inquirer = require("inquirer");
const sinon = require("sinon");

const CredentialManager = require("../../lib/credential-manager");
const configure = require("../../commands/configure");

chai.use(dirtyChai);

describe("a credential manager", () => {
  var creds;
  const name = "twine-test";

  before(() => {
    creds = new CredentialManager(name);
  });

  it("should add credentials when none are found ", async () => {
    // TODO : 学完 sinon 后优化下
    sinon.stub(inquirer, "prompt").resolves({
      key: "two",
      secret: "two-secret"
    });
    await configure.consumer(name);
    const [key, secret] = await creds.getKeyAndSecrect();
    expect(key).to.equal("two");
    expect(secret).to.equal("two-secret");
    inquirer.prompt.restore();
  });

  it("should overwrite exsting credentials ", async () => {
    sinon.stub(inquirer, "prompt").resolves({
      key: "three",
      secret: "four"
    });
    await configure.consumer(name);
    const [key, secret] = await creds.getKeyAndSecrect();
    expect(key).to.equal("three");
    expect(secret).to.equal("four");
    inquirer.prompt.restore();
  });

  after(() => {
    fs.unlinkSync(
      path.join(process.env.HOME, ".config", "configstore", name + ".json")
    );
  });
});
