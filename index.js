const express = require('express');
const bodyParser = require('body-parser');
const {
  getTalkers,
  findTalker,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalkers,
} = require('./talker');
const { postLogin } = require('./login');
const { validateEmail } = require('./middlewares/validateEmail');
const {
  validatePassword,
} = require('./middlewares/validatePassword');
const {
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./middlewares/validateTalker');
const { validateToken } = require('./middlewares/validateToken');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/search', validateToken, searchTalkers);

app.get('/talker', getTalkers);

app.get('/talker/:id', findTalker);

app.post(
  '/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  addTalker,
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  editTalker,
);

app.delete('/talker/:id', validateToken, deleteTalker);

app.post('/login', validateEmail, validatePassword, postLogin);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
