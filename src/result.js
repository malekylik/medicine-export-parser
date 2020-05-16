const RESULT_TYPE_PROPERTY_NAME = '__result_type__';

const ResultType = {
  Ok: 'Ok',
  Error: 'Error',
}

function isResultOk(result) {
  result[RESULT_TYPE_PROPERTY_NAME] === ResultType.Ok;
}

function isResultError(result) {
  result[RESULT_TYPE_PROPERTY_NAME] === ResultType.Error;
}

function getResultType(result) {
  return result[RESULT_TYPE_PROPERTY_NAME];
}

function createOkResult(value) {
  return {
    [RESULT_TYPE_PROPERTY_NAME]: ResultType.Ok,
    value,
  }
}

function createErrorResult(value) {
  return {
    [RESULT_TYPE_PROPERTY_NAME]: ResultType.Error,
    value,
  }
}

module.exports = {
  ResultType,
  isResultOk,
  isResultError,
  getResultType,
  createOkResult,
  createErrorResult,
};

