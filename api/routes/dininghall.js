var express = require('express');
var router = express.Router();
let hallModel = require('../models/diningHall.model');
let dishModel = require('../models/dish.model.js');
let User = require('../models/user.model');

/* get all dininghall data */
router.get('/', function(req, res) {
  hallModel.find()
    .then(halls => {res.json(halls); console.log(halls);})
    .catch(err => res.status(400).json("error: " + err))
});

router.route('/addReview').post((req, res) => {
  const hallName = req.body.hallName;
  const rating = req.body.rating;
  const review = req.body.review;
  const username = req.body.username;
  const currTime = req.body.currTime;

  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        console.log("Hall name is " + hallName)
        console.log("Rating is " + rating)
        console.log("Review is " + review)
        console.log("username is " + username)
        res.send("dining hall not found")
      }
      else {
        User.findOne({username: req.body.username})
        .then(user => {
          if (user == null) {return res.json("user error");}
          else {
            if (user.currentDiningHall == "") {return res.json("user not checked in");}
            user.currentDiningHall = "";
            user.save();
            result.rating = ((result.rating * result.numRatings) + rating)/(result.numRatings + 1);
            result.numRatings += 1;
            result.population -= 1;
            if (review != "") {
              result.reviews.push({username: username, rating: rating, time: currTime, body: review});
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
  const username = req.body.username;

  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.send("dining hall not found")
      }
      else {
        User.findOne({username: username})
        .then(user => {
          if (user == null) {return res.json("user error");}
          else {
            if ("currentDiningHall" in user && user.currentDiningHall !== "") {return res.json("User is already checked in")}
            user.currentDiningHall = hallName;
            user.save();
            result.population += 1;
            result.save()
            res.json("Checked in!");
          }
        })
        .catch(error => res.status(400).send(err))
      }
    })
    .catch(err => {
      res.status(400).send(err);
    })
});

router.route('/checkOut')
.patch((req, res) => {
  const hallName = req.body.hallName;
  const username = req.body.username;

  hallModel.findOne({name: hallName})
    .then(result => {
      if (result == null) {
        res.send("dining hall not found")
      }
      else {
        User.findOne({username: username})
        .then(user => {
          if (user == null) {return res.json("user error");}
          else {
            if (user.currentDiningHall == "") {return res.json("user not checked in");}
            user.currentDiningHall = "";
            user.save();
            result.population -= 1;
            result.save()
              .then(() => {
                res.json("Checked Out!");
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


router.route('/addDishToMenu')
.post((req, res) => {
  const hallName = req.body.hallName;
  const dishName = req.body.dishName;
  const calories = req.body.calories;
  const tags = req.body.tags;

  hallModel.findOne({name: hallName})
    .then(hall => {
      if (hall == null) {return res.json("hall not found");}
      else {
        const newDish = new dishModel({name: dishName, calories: calories, tags: tags, hall: hall.name});
        newDish.save()
          .then(() => {
            hall.menu.push({dishName: dishName, calories: calories, tags: tags});
            hall.save();
            res.json(newDish);
          })
          .catch((err) => res.status(400).json(err))
      }
    })
    .catch(err => res.status(400).json("error: " + err))
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
    .catch(err => res.status(400).json("error: " + err))
});

module.exports = router;