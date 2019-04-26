#! /usr/bin/env node

const CredentialManager = require("../lib/credential-manager");

async function main() {
  const creds = new CredentialManager("twine");
  const [key, secret] = await creds.getKeyAndSecrect();
  console.log(key, secret);
}

main().catch(console.error);
