const express = require('express');
const { logIn } = require('../login');
const { validateEmail } = require('../middlewares/validateEmail');
const { validatePassword } = require('../middlewares/validatePassword');

const router = express.Router();

// PATH: /login
router.post('/', validateEmail, validatePassword, logIn);

module.exports = router;
