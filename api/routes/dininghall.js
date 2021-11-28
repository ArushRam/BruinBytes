var express = require('express');
var router = express.Router();
let diningHallModel = require('../models/diningHall.model');

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
  var currDiningHall = dininghallData.filter(hall => {   // matches dininghall/[hallName] to array
    return hall.dininghall == req.params.hallName
  });
  if (currDiningHall.length == 1) {                      // if found, return json of full data
    res.json(currDiningHall[0]);
  } 
  else {
    res.status(404).json({message: "Not Found"});
  }
});

module.exports = router;