#! /usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");

program.version(pkg.version);

program.command("configure", "configure Twitter-related credentials");

program.parse(process.argv);
