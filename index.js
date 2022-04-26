const express = require('express');
const bodyParser = require('body-parser');
const { getTalkers, findTalker } = require('./talker');
const { postLogin } = require('./login');
const { validateEmail } = require('./middlewares/validateEmailMiddleware');
const { validatePassword } = require('./middlewares/validatePasswordMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getTalkers);

app.get('/talker/:id', findTalker);

app.post('/login', validateEmail, validatePassword, postLogin);

app.listen(PORT, () => {
  console.log('Online');
});
