const { generateToken } = require('./generateToken');
const { SUCCESS, UNAUTHORIZED } = require('./statusCode');

const postLogin = (req, res) => {
  const { email, password } = req.body;
  const token = generateToken(16);
  if (!email || !password) {
    return res.status(UNAUTHORIZED).json({ message: 'Email and password must be provided' }).end();
  }
  return res.status(SUCCESS).json({ token }).end();
};

module.exports = {
  postLogin,
};
