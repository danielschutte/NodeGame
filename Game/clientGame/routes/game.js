var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  res.render('gameField', { title: 'new player' ,customJs:'/Javascripts/GameLogic.js'});
});

module.exports = router;
