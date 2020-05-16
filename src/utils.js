const {
  NODE_INSTANCE_PATH_ARGUMENT_INDEX,
  SCRIPT_PATH_ARGUMENT_INDEX,
  SCRIPT_ARGUMENTS_START_INDEX,
} = require('./const');
const { createOkResult } = require('./result');

function parseSriptArguments(args) {
  return createOkResult(args);
}


module.exports = {
  parseSriptArguments,
};

