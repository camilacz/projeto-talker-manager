const { generateToken } = require('../utils/generateToken');
const { SUCCESS } = require('../statusCode');

const logIn = (_req, res) => {
  const token = generateToken(16);
  return res.status(SUCCESS).json({ token }).end();
};

module.exports = {
  logIn,
};
