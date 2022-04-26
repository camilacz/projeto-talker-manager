const { BAD_REQUEST } = require('../statusCode');
const errorConstructor = require('../utils/errorConstructor');

const validateEmail = (req, _res, next) => {
  const { email } = req.body;
  if (!email) {
    next(errorConstructor(BAD_REQUEST, 'O campo "email" é obrigatório'));
  }

  const validFormat = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!validFormat) {
    next(errorConstructor(BAD_REQUEST, 'O "email" deve ter o formato "email@email.com"'));
  }

  next();
};

module.exports = {
  validateEmail,
};
