var express = require('express');
var router = express.Router();
let hallModel = require('../models/diningHall.model');
let dishModel = require('../models/dish.model');

router.get('/', (req, res) => {
    dishModel.find()
      .then(dishes => res.json(dishes))
      .catch(err => res.status(400).json("error: " + err))
  });