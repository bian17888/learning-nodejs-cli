const inquirer = require("inquirer");

const CredentialManager = require("../lib/credential-manager");
const util = require("../lib/util");

const configure = {
  async consumer(name) {
    const cred = new CredentialManager(name);
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "key",
        message: "Enter your Twitter API Key : ",
        validate: util.notEmpty
      },
      {
        type: "password",
        name: "secret",
        message: "Enter your Twitter API Secret : ",
        validate: util.notEmpty
      }
    ]);
    cred.storeKeyAndSecrect(answers.key, answers.secret);
  }
};

module.exports = configure;
