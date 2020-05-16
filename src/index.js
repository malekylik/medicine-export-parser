const path = require('path');
const fs = require('fs');
const util = require('util');

const { parseSriptArguments } = require('./utils');
const { isResultError } = require('./result');
const { parseCSVFile } = require('./csv');

const readFile = util.promisify(fs.readFile);

const parsedArgs = parseSriptArguments(process.argv);

if (isResultError(parsedArgs)) {
  console.log(parsedArgs.value);

  return;
}

async function run(args) {
  const file = await readFile(args.file, { encoding: 'utf8' });

  console.log(file);
  console.log(parseCSVFile(file));
}

console.log('parsedArgs', parsedArgs.value, parsedArgs.value.args);

run(parsedArgs.value);
