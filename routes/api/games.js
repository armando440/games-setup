var express = require('express');
var router = express.Router();
const {
    readGames, 
    createGame
} = require('../../data/games');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const data = await readGames();
  res.send(data);
});

router.post('/', async function(req, res) {
 /* //extract request body data
  const body = req.body;
  //use the DAL to create using that data
  const data = await createGame(body);
  //send the results
  res.send(data);*/
  res.send(await createGame(req.body));
})

module.exports = router;
