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

  // userExists records whether or not there is already a user in the database
  // If there is, we just return false and do nothing
  // Otherwise add user
  User.exists({username: username}).then(exists => {
    if (exists) {
      res.json(false)
    } else {
      newUser.save()
      .then(() => res.json(true))
      .catch(err => res.status(403).json('Error: ' + err));
    }
  })
})

module.exports = router;
