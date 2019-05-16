const path = require("path");
const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const dirtyChai = require("dirty-chai");

const CredentialManager = require("../../lib/credential-manager");

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe("the credential manager", () => {
  var creds;
  const name = "twine-test";

  before(() => {
    creds = new CredentialManager(name);
  });

  it("should return credentials when they are found ", async () => {
    await creds.storeKeyAndSecrect('apiKey', "foo", "bar");
    const [key, secret] = await creds.getKeyAndSecrect('apiKey');
    expect(key).to.be.equal("foo");
    expect(secret).to.be.equal("bar");
  });

  it("should reject when no credentials are found", async () => {
    await creds.cleanKeyAndSecrect('apiKey');
    expect(creds.getKeyAndSecrect('apiKey')).to.be.rejected();
  });

  after(() => {
    fs.unlinkSync(
      path.join(process.env.HOME, ".config", "configstore", name + ".json")
    );
  });
});
