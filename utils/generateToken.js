// Source: https://stackoverflow.com/questions/8532406/create-a-random-token-in-javascript-based-on-user-details

const generateToken = (length) => {
  const characters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789';
  let token = '';
  for (let i = 0; i < length; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
};

module.exports = {
  generateToken,
};
