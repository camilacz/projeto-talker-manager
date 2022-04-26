const fs = require('fs').promises;
const { SUCCESS, NOT_FOUND, CREATED } = require('./statusCode');

const TALKERS_FILE = 'talker.json';

const getTalkers = (_req, res) => {
  fs.readFile(TALKERS_FILE)
    .then((data) => res.status(SUCCESS).json(JSON.parse(data)).end())
    .catch((err) => console.log(err.message));
};

const findTalker = (req, res) => {
  const { id } = req.params;
  fs.readFile(TALKERS_FILE)
    .then((data) => {
      const talker = JSON.parse(data).find(
        (person) => person.id === Number(id),
      );
      if (!talker) {
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }).end(); 
      }
      return res.status(SUCCESS).json(talker).end();
    })
    .catch((err) => console.log(err.message));
};

const addTalker = async (req, res) => {
  const { body } = req;
  const talkers = await fs.readFile(TALKERS_FILE)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));

  const response = {
    id: talkers.length + 1,
    ...body,
  };

  const json = [...talkers, response];

  fs.writeFile(TALKERS_FILE, JSON.stringify(json));
  return res.status(CREATED).json(response).end();
};

const editTalker = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  body.id = Number(id);

  const talkers = await fs.readFile(TALKERS_FILE)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));
  
  const newList = talkers.map((person) => (person.id === Number(id) ? body : person));
  fs.writeFile(TALKERS_FILE, JSON.stringify(newList));
  return res.status(SUCCESS).json(body).end();
};

module.exports = {
  getTalkers,
  findTalker,
  addTalker,
  editTalker,
};
