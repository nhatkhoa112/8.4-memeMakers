const express = require('express');
const router = express.Router();
const fs = require('fs');
const { upload } = require('../middlewares/upload.helper');
const { resize } = require('../middlewares/photo.helper');
const { createMeme, getMemes } = require('../controllers/memes.controller');

// let memesData;

// function readBooksData() {
//   fs.readFile(`memes.json`, 'utf8', function (err, data) {
//     if (err) throw err;
//     memesData = JSON.parse(data);
//   });
// }
// readBooksData();

// function save(data) {
//   const json = JSON.stringify(data);
//   fs.writeFile('../memes.json', json, function (err) {
//     if (err) return console.log(err);
//   });
// }

/**
 * @route GET api/memes
 * @description Get all memes
 * @access Public
 */
// GET memes list
router.get('/', getMemes, function (req, res, next) {
  res.json({ status: 200, message: 'ok' });
});

// // GET individual meme by ID
// router.get('/:memeId', function (req, res) {
//   try {
//     const idx = memesData.memes.findIndex(
//       (m) => m.id === parseInt(req.params.memeId)
//     );

//     if (idx === -1) throw Error;
//     let meme = memesData.memes[idx];
//     res.send(meme);
//   } catch (error) {
//     res.status(404).json({ message: 'Meme not found' });
//   }
// });

/**
 * @route POST api/memes
 * @description Create a new meme
 * @access Public
 */
router.post(
  '/',
  upload.single('image'),
  resize,
  createMeme,
  (req, res, next) => {
    try {
      if (!req.body.image) throw Error;
      console.log(req.file);
      res.json({ status: 'ok' });
    } catch (error) {
      res.status(500).json({ message: 'Image required' });
    }
  }
);

module.exports = router;
