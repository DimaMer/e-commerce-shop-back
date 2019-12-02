exports.catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.notFoundError = (req, res, next) =>{
  const err = new Error('Wrong route!');
  err.status = 404;
  next(err);
};

exports.dbValidationError = (err, req, res, next) => {
  if (!err.errors) return next(err);
  const data = Object.entries(err.errors).map(([schemaField, errObj]) => ({
    schemaField, // field in Schema
    // message from required field in Schema
    message: `${errObj.path.charAt(0).toUpperCase() + errObj.path.slice(1)} is ${errObj.kind}`,
  }));
  const dbError = new Error('DB Validation failed!');
  dbError.status = 422;
  dbError.data = data;
  next(dbError);
};

exports.CustomError = (err, req, res, next) => {
  const stackFormatted = err.stack
    .split('\n')
    .map(i => i.replace(__dirname.split('/server')[0], '').trim())
    .slice(0, 5);
  // Create error response
  const errorDetails = {
    message: err.message,
    status: err.status,
    data: err.data,
    stackFormatted,
  };
  res.status(err.status || 500).json(errorDetails);
};
