var express = require('express');
var router = express.Router();
const {
    readGames, 
    createGame,
    deleteGame
} = require('../../data/games');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const data = await readGames();
  res.send(data);
});

router.post('/', async function(req, res) {
  //extract request body data
  const body = req.body;
  //use the DAL to create using that data
  const data = await createGame(body);
  //send the results
  res.send(data);
  //res.send(await createGame(req.body)); // this is the same as the code above but it is condenced into one line same thing though. 
});

router.delete('/:id', async function(req, res) {
  const data = await deleteGame(req.params.id);//take notes on this and get more familiar with req.params
  res.send(data);
});

module.exports = router;
