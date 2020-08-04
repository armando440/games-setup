var express = require('express');
var router = express.Router();
const {
    readGames
} = require('../../data/games');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const data = await readGames();
  res.send(data);
});

module.exports = router;
