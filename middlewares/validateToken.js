const { UNAUTHORIZED } = require('../statusCode');
const errorConstructor = require('../utils/errorConstructor');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    next(errorConstructor(UNAUTHORIZED, 'Token não encontrado'));
  }

  if (authorization.length !== 16) {
    next(errorConstructor(UNAUTHORIZED, 'Token inválido'));
  }

  next();
};

module.exports = {
  validateToken,
};
