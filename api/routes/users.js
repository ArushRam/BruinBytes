var express = require('express');
var router = express.Router();
let User = require('../models/user.model')

/* GET users listing. */
router.get('/', function(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/addUser').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({username: username, password: password});
  newUser.save()
    .then(() => res.json('Succesfully signed up!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
