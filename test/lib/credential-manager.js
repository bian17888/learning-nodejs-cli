const path = require("path");
const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const chaiAsPromised = require("chai-as-promised");
const dirtyChai = require("dirty-chai");

const CredentialManager = require("../../lib/credential-manager");

chai.use(chaiAsPromised);
chai.use(dirtyChai);

describe("a credential manager", () => {
  var creds;
  const name = "twine-test";

  before(() => {
    creds = new CredentialManager(name);
  });

  it("should return credentials when they are found ", async () => {
    await creds.storeKeyAndSecrect("foo", "bar");
    const [key, secret] = await creds.getKeyAndSecrect();
    expect(key).to.be.equal("foo");
    expect(secret).to.be.equal("bar");
  });

  it("should reject when no credentials are found", async () => {
    await creds.cleanKeyAndSecrect();
    expect(creds.getKeyAndSecrect()).to.be.rejected();
  });

  after(done => {
    fs.unlink(
      path.join(process.env.HOME, ".config", "configstore", name + ".json"),
      done
    );
  });
});
