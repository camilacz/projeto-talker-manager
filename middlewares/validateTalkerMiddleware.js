const { BAD_REQUEST } = require('../statusCode');
const checkDate = require('../utils/checkDate');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const validateAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age % 1 !== 0 || age < 18) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !('watchedAt' in talk) || !('rate' in talk)) {
    return res
      .status(BAD_REQUEST)
      .json({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }

  next();
};

const validateWatchedAt = (req, res, next) => {
  const {
    talk: { watchedAt },
  } = req.body;

  if (!watchedAt || !checkDate(watchedAt)) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const validateRate = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;

  if (rate % 1 !== 0 || rate < 1 || rate > 5) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
};
