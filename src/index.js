const { parseSriptArguments } = require('./utils');
const { isResultError } = require('./result');

const parsedArgs = parseSriptArguments(process.argv);

if (isResultError(parsedArgs)) {
  console.log(parsedArgs.value);

  return;
}

console.log('parsedArgs', parsedArgs.value, parsedArgs.value.args);


