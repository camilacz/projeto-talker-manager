const { BAD_REQUEST } = require('../statusCode');

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validFormat = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  if (!email || !validFormat) {
    return res.status(BAD_REQUEST).json({ message: 'O campo "email" é obrigatório' });
  }
  next();
};

module.exports = {
  validateEmail,
};
