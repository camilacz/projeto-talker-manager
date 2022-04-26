const fs = require('fs').promises;

const TALKERS_FILE = 'talker.json';

// Get content of 'talker.json' as object
const readTalker = async () => fs.readFile(TALKERS_FILE)
  .then((data) => JSON.parse(data))
  .catch((err) => console.log(err.message));

// Overwrite content of 'talker.json'
const writeTalkers = (content) => fs.writeFile(TALKERS_FILE, JSON.stringify(content));

module.exports = {
  readTalker,
  writeTalkers,
};
