var express = require('express');
var router = express.Router();
let hallModel = require('../models/diningHall.model');
let dishModel = require('../models/dish.model.js');
const User = require('../models/user.model');

/* get all dininghall data */
router.get('/', function(req, res) {
  hallModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("error"))
});

router.route('/addReview').post((req, res) => {
  const hallName = req.body.name;
  const rating = req.body.rating;
  const review = req.body.review;
  const username = req.body.username;

  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.send("dining hall not found")
      }
      else {
        User.findOne({username: req.body.username})
        .then(user => {
          if (user == null) {return res.json("user error");}
          else {
            user.currentDiningHall = "";
            user.save();
            result.rating = ((result.rating * result.numRatings) + rating)/(result.numRatings + 1);
            result.numRatings += 1;
            result.population -= 1;
            if (review != "") {
              result.reviews.push(review);
            }
            result.save()
              .then(() => {
                res.json(result);
              })
              .catch((err) => {
                res.json("error");
              });
          }
        })
        .catch(error => res.status(400).send(err))
      };
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.route('/checkIn')
.patch((req, res) => {
  const hallName = req.body.hallName;
  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.send("dining hall not found")
      }
      else {
        User.findOne({username: req.body.username})
        .then(user => {
          if (user == null) {return res.json("user error");}
          else {
            user.currentDiningHall = req.body.hallName;
            user.save();
            result.population += 1;
            result.save()
            res.json(result);
          }
        })
        .catch(error => res.status(400).send(err))
      }
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.route('/addDishToMenu')
.post((req, res) => {

})

/* GET specific dininghall page. */
router.get('/:hallName', function(req, res) {
  const hallName = req.params.hallName;
  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.status(404).json("Not Found");
      }
      else {
        res.json(result);
      }
    })
});

module.exports = router;