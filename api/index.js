const express = require('express');
const router = express.Router();

// All route of Meme
const memeAPI = require('./memes.api');
router.use('/memes', memeAPI);

router.get('/', (req, res) => {
  res.json({ foo: 'bar' });
});

module.exports = router;
