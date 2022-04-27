const express = require('express');
const bodyParser = require('body-parser');
const { postLogin } = require('./login');
const { validateEmail } = require('./middlewares/validateEmail');
const { validatePassword } = require('./middlewares/validatePassword');
const errorMiddleware = require('./middlewares/errorMiddleware');
const talkerRouter = require('./routes/talkerRouter');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRouter);

app.post('/login', validateEmail, validatePassword, postLogin);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
