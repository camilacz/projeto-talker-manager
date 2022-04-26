const { INTERNAL_SERVER_ERROR } = require('../statusCode');

const errorMiddleware = (err, req, res, _next) => {
  console.log(err);

  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
};

module.exports = errorMiddleware;
