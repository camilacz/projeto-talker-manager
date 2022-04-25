const fs = require('fs').promises;

const SUCCESS = 200;

const getTalkers = (_req, res) => {
  fs.readFile('talker.json')
    .then((data) => res.status(SUCCESS).json(JSON.parse(data)).end())
    .catch((err) => console.log(err.message));
};

module.exports = {
  getTalkers,
};
