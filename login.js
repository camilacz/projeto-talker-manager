const { generateToken } = require('./generateToken');
const { SUCCESS } = require('./statusCode');

const postLogin = (_req, res) => {
  const token = generateToken(16);
  return res.status(SUCCESS).json({ token }).end();
};

module.exports = {
  postLogin,
};
