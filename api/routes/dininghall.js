var express = require('express');
var router = express.Router();
let hallModel = require('../models/diningHall.model');

//temp array to hold data, use MongoDB later
var dininghallData = [
  {"dininghall": "De Neve", "capacity": "2", "rating": "3"},
  {"dininghall": "BPlate", "capacity": "2", "rating": "4.5"},
  {"dininghall": "Epicuria", "capacity": "2", "rating": "4.5"},
  {"dininghall": "Bruin Cafe", "capacity": "2", "rating": "4.5"},
  {"dininghall": "The Study", "capacity": "2", "rating": "4.5"},
  {"dininghall": "Rendezvous West", "capacity": "2", "rating": "4.5"},
  {"dininghall": "Rendezvous East", "capacity": "2", "rating": "4.5"}
]

/* get all dininghall data */
router.get('/', function(req, res) {
  res.json(dininghallData);
});

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

router.route('/addReview').post((req, res) => {
  const hallName = req.body.name;
  const rating = req.body.rating;
  const review = req.body.review;

  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.send("dining hall not found")
      }
      else {
        result.rating = ((result.rating * population) + rating)/(result.population + 1);
        result.population += 1;
        if (review != "") {
          result.reviews.push(review);
        }
        result.save();
        res.json(result);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.route('/checkIn/:hallName').patch((req, res) => {
  const hallName = req.params.hallName;
  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.send("dining hall not found")
      }
      else {
        result.population += 1;
        result.save()
        res.json(result);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

module.exports = router;