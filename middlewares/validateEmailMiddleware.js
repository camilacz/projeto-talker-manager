const { BAD_REQUEST } = require('../statusCode');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "email" é obrigatório' });
  }

  const validFormat = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!validFormat) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  next();
};

module.exports = {
  validateEmail,
};
