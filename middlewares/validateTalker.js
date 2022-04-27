const { BAD_REQUEST } = require('../statusCode');
const checkDate = require('../utils/checkDate');
const errorConstructor = require('../utils/errorConstructor');

const validateName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) {
    next(errorConstructor(BAD_REQUEST, 'O campo "name" é obrigatório'));
  }
  if (name.length < 3) {
    next(errorConstructor(BAD_REQUEST, 'O "name" deve ter pelo menos 3 caracteres'));
  }

  next();
};

const validateAge = (req, _res, next) => {
  const { age } = req.body;
  if (!age) {
    next(errorConstructor(BAD_REQUEST, 'O campo "age" é obrigatório'));
  }
  if (age % 1 !== 0 || age < 18) {
    next(errorConstructor(BAD_REQUEST, 'A pessoa palestrante deve ser maior de idade'));
  }

  next();
};

// Validation of key "talk"
const validateTalkKey = (talk) => talk && 'watchedAt' in talk && 'rate' in talk;
const validateWatchedAt = (watchedAt) => watchedAt && checkDate(watchedAt);
const validateRate = (rate) => rate % 1 === 0 && rate > 0 && rate <= 5;

const validateTalk = (req, _res, next) => {
  const { talk } = req.body;

  if (!validateTalkKey(talk)) {
    next(errorConstructor(
      BAD_REQUEST,
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    ));
  }

  if (!validateWatchedAt(talk.watchedAt)) {
    next(errorConstructor(BAD_REQUEST, 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'));
  }

  if (!validateRate(talk.rate)) {
    next(errorConstructor(BAD_REQUEST, 'O campo "rate" deve ser um inteiro de 1 à 5'));
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateTalk,
};
