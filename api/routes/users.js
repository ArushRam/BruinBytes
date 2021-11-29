var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
let User = require('../models/user.model')

/* GET users listing. */
router.get('/', function(req, res) {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
});

// handle sign up
router.route('/addUser').post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({username: username, password: hashedPassword, currentDiningHall:"", favoriteDish:""});
    
    // userExists records whether or not there is already a user in the database
    // If there is, we just return false and do nothing
    // Otherwise add user
    User.exists({username: username}).then(exists => {
      if (exists) {
        res.json(false)
      } else {
        newUser.save()
        .then(() => res.json())
        .catch(err => res.status(400).json('Error: ' + err));
      }});
  } catch {
    res.status(400).json('Error' + err);
  }
});

// handle sign in
router.route('/signin')
.post(async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({username: username}).then(async user => {
    if (user == null) {
      return res.json("username error");
    }
    else {
      try {
        if (await bcrypt.compare(password, user.password)) {res.json(user);}
        else {res.json("password error");}
      }
      catch {
        res.status(500).send("server error");
      }
    }
  })
});

router.route('/favFood')
  .get((req, res) => {
    User.findOne({username: req.body.username})
      .then(user => {
        res.json(user.favoriteDish);
      })
      .catch(err => res.status(400).json(err));
  })
  .post((req, res) => {
    User.findOne({username: req.body.username})
      .then(user => {
        user.favoriteDish = req.body.favFood;
        user.save();
        res.json(user);
      })
      .catch(err => res.status(400).json(err));
  })

module.exports = router;
