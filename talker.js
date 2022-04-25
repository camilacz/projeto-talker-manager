const fs = require('fs').promises;

const SUCCESS = 200;
const NOT_FOUND = 404;
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
        return res.status(NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
      }
      return res.status(SUCCESS).json(talker).end();
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  getTalkers,
  findTalker,
};
