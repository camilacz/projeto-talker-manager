const { BAD_REQUEST } = require('../statusCode');
const errorConstructor = require('../utils/errorConstructor');

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    next(errorConstructor(BAD_REQUEST, 'O campo "password" é obrigatório'));
  }

  if (password.length < 6) {
    next(errorConstructor(BAD_REQUEST, 'O "password" deve ter pelo menos 6 caracteres'));
  }

  next();
};

module.exports = {
  validatePassword,
};
