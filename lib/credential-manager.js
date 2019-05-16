const ConfigStore = require("configstore");
const keytar = require("keytar");

class CredentialManager {
  constructor(name) {
    this.conf = new ConfigStore(name);
    this.service = name;
  }

  async getKeyAndSecrect(prop) {
    const key = this.conf.get(prop);
    if (!key) {
      throw new Error("API Key is not found");
    }
    // const secret = await keytar.getPassword(this.service, key);
    return [key, secret];
  }

  async storeKeyAndSecrect(prop, key, secret) {
    this.conf.set(prop, key);
    await keytar.setPassword(this.service, key, secret);
  }

  async cleanKeyAndSecrect(prop) {
    const key = this.conf.get(prop);
    this.conf.delete(prop);
    console.log(this.service, key);
    await keytar.deletePassword(this.service, key);
  }
}

module.exports = CredentialManager;
