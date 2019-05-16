const path = require("path");
const fs = require("fs");
const chai = require("chai");
const expect = chai.expect;
const dirtyChai = require("dirty-chai");
const inquirer = require("inquirer");
const sinon = require("sinon");

const CredentialManager = require('../../lib/credential-manager')
const configure = require("../../commands/configure");

chai.use(dirtyChai);

describe("a credential manager", () => {
  var creds
  var sandbox

  before(() => {
    creds = new CredentialManager('twine-test')
  });
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  it('should add credentials when none are found', async () => {
    sandbox.stub(inquirer, 'prompt').resolves({ key: 'one', secret: 'two' })
    await configure.consumer('twine-test')
    let [key, secret] = await creds.getKeyAndSecret('consumer')
    expect(key).to.equal('one')
    expect(secret).to.equal('two')
    expect(inquirer.prompt.calledOnce).to.be.true()
  })
  it('should overwrite existing credentials', async () => {
    sandbox.stub(inquirer, 'prompt').resolves({ key: 'three', secret: 'four' })
    await configure.consumer('twine-test')
    let [key, secret] = await creds.getKeyAndSecret('consumer')
    expect(key).to.equal('three')
    expect(secret).to.equal('four')
    expect(inquirer.prompt.calledOnce).to.be.true()
  })

  afterEach(() => {
    sandbox.restore()
  })
  after(async () => {
    await fs.unlink(path.join(process.env.HOME, '.config', 'configstore', 'twine-test.json'))
  });
});
