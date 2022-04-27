const express = require('express');
const { validateToken } = require('../middlewares/validateToken');
const {
  validateName,
  validateAge,
  validateTalk,
} = require('../middlewares/validateTalker');
const {
  getTalkers,
  addTalker,
  findTalker,
  deleteTalker,
  editTalker,
  searchTalkers,
} = require('../middlewares/talker');

const router = express.Router();

// PATH: /talker/search
router.get('/search', validateToken, searchTalkers);

// PATH: /talker/:id
router.get('/:id', findTalker);

router.put(
  '/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  editTalker,
);

router.delete('/:id', validateToken, deleteTalker);

// PATH: /talker
router.get('/', getTalkers);

router.post(
  '/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  addTalker,
);

module.exports = router;
