function respond(res, next, status, data, httpCode) {
  const response = {
    status,
    data,
  };

  res.setHeader('content-type', 'applicateion/json');
  res.writeHeader(httpCode);
  res.end(JSON.stringify(response));
  return next();
}

module.exports.success = (res, next, data) => {
  respond(res, next, 'success', data, 200);
};

module.exports.failure = (res, next, data, httpCode) => {
  respond(res, next, 'failure', data, httpCode);
};

module.exports.notExist = (res, next, id, data) => {
  if (typeof (data[id]) === 'undefined') {
    this.failure(res, next, 'Could not be found in the database', 404);
  }
};
