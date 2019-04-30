const ConfigStore = require("configstore");
const keytar = require("keytar");

class CredentialManager {
  constructor(name) {
    this.conf = new ConfigStore(name);
    this.service = name;
  }

  async getKeyAndSecrect() {
    const key = this.conf.get("apiKey");
    if (!key) {
      throw new Error("API Key is not found");
    }
    const secret = await keytar.getPassword(this.service, key);
    return [key, secret];
  }

  async storeKeyAndSecrect(key, secret) {
    this.conf.set("apiKey", key);
    await keytar.setPassword(this.service, key, secret);
  }

  async cleanKeyAndSecrect() {
    const key = this.conf.get("apiKey");
    this.conf.delete("apiKey");
    await keytar.deletePassword(this.service, key);
  }
}

module.exports = CredentialManager;
