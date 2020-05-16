const {
  NODE_INSTANCE_PATH_ARGUMENT_INDEX,
  SCRIPT_PATH_ARGUMENT_INDEX,
  SCRIPT_ARGUMENTS_START_INDEX,
  SUPPORTED_TYPES,
} = require('./const');
const { createOkResult, createErrorResult } = require('./result');

function isArg(arg) {
  return /^-/.test(arg);
}

function isFullArg(arg) {
  return /^--/.test(arg);
}

function isSupportedFileType(arg) {
  const supportedTypes = SUPPORTED_TYPES.join('|');

  return new RegExp(`\.(${supportedTypes})$`).test(arg);
}

function splitArgs(args) {
  const splitedArgs = {
    args: [],
    paths: [],
  };

  for (let arg of args) {
    if (isArg(arg) || isFullArg(arg)) {
      splitedArgs.args.push(arg);
    } else {
      splitedArgs.paths.push(arg);
    }
  }

  return splitedArgs;
}

function parseSriptArguments(args) {
  const params = args.slice(SCRIPT_ARGUMENTS_START_INDEX);

  const parsedArgs = {
    nodeInstancePath: args[NODE_INSTANCE_PATH_ARGUMENT_INDEX],
    scriptPath: args[SCRIPT_PATH_ARGUMENT_INDEX],
    args: [],
    file: '',
  };

  const splitedArgs = splitArgs(params);
  const supportedFiles = splitedArgs.paths.filter(isSupportedFileType);

  console.log('supportedFiles', supportedFiles);

  if (supportedFiles.length === 0) {
    return createErrorResult('File to open should be passed');
  }

  if (supportedFiles.length > 1) {
    return createErrorResult('Multiple files is not supported');
  }

  return createOkResult(args);
}

module.exports = {
  parseSriptArguments,
};

