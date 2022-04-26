const fs = require('fs').promises;
const { SUCCESS, NOT_FOUND, CREATED, NO_CONTENT } = require('./statusCode');
const { readTalker, writeTalkers } = require('./utils/touchFile');

const TALKERS_FILE = 'talker.json';

// Requisito 1
const getTalkers = async (_req, res) => {
  const fileContent = await readTalker();
  return res.status(SUCCESS).json(fileContent).end();
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

// Requisito 5
const addTalker = async (req, res) => {
  const { body } = req;

  const talkers = await readTalker();

  const response = { id: talkers.length + 1, ...body };
  const newList = [...talkers, response];

  writeTalkers(newList);
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

const deleteTalker = async (req, res) => {
  const { id } = req.params;

  const talkers = await fs.readFile(TALKERS_FILE)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));

  const newList = talkers.filter((person) => person.id !== Number(id));
  fs.writeFile(TALKERS_FILE, JSON.stringify(newList));
  return res.status(NO_CONTENT).end();
};

const searchTalkers = async (req, res) => {
  const { q } = req.query;
  
  const talkers = await fs.readFile(TALKERS_FILE)
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err.message));
  
  const result = talkers.filter(({ name }) => name.includes(q));
  return res.status(SUCCESS).json(result).end();
};

module.exports = {
  getTalkers,
  findTalker,
  addTalker,
  editTalker,
  deleteTalker,
  searchTalkers,
};
