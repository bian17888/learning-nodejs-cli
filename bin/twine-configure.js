#! /usr/bin/env node

const program = require("commander");
var colors = require("colors");

const pkg = require("../package.json");
const configure = require("../commands/configure");

program.version(pkg.version);

program
  .command("consumer")
  .description("add a Twitter API key and secret")
  .action(async () => {
    await configure.consumer(pkg.name);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(txt => {
    return colors.yellow(txt);
  });
}
