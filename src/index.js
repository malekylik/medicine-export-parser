const fs = require('fs');
const util = require('util');

const { parseSriptArguments } = require('./utils');
const { isResultError } = require('./result');
const { parseCSVFile, showCSVRow } = require('./csv');

const readFile = util.promisify(fs.readFile);

const parsedArgs = parseSriptArguments(process.argv);

if (isResultError(parsedArgs)) {
  console.log(parsedArgs.value);

  return;
}

async function run(args) {
  const file = await readFile(args.file, { encoding: 'utf8' });
  const csv = parseCSVFile(file);

  console.log(csv.map((v, i) => showCSVRow(csv, i)).slice(0, 20).join('\n'));
}

console.log('parsedArgs', parsedArgs.value, parsedArgs.value.args);

run(parsedArgs.value);
