var express = require('express');
var router = express.Router();

/* GET dininghall page. */
router.get('/', function(req, res, next) {
  res.send('dininghall api');
});

module.exports = router;