var express = require('express');
var router = express.Router();
let hallModel = require('../models/diningHall.model');
let dishModel = require('../models/dish.model');

router.get('/', (req, res) => {
    dishModel.find()
      .then(dishes => res.json(dishes))
      .catch(err => res.status(400).json("error: " + err))
  });

router.post('/getDishInfo', (req, res) => {
    const dishName = req.body.dishName;
    dishModel.findOne({name: dishName})
        .then(result => {
            if (result == null) {return res.status(400).json("no such dish")}
            else {
                res.json(result);
            }
        })
        .catch(err => res.status(400).json("query error"))
});

router.post('/getDishes', async (req, res) => {
    const searchString = req.body.dishName.toLowerCase();
    var dishes = []
    await dishModel.find()
        .then(result => {
            result.map(dish => {
                if (dish.name.toLowerCase().includes(searchString)) {
                    dishes.push(dish)
                }
                else {
                    console.log(dish.name.toLowerCase());
                }
            })
        })
        .catch(err => res.status(400).json(err));
    console.log(dishes);
    res.json(dishes);
})

/*
router.post('/getHalls', (req, res) => {
    const dishName = req.body.dishName;
    dishModel.findOne({name: dishName})
        .then(async dish => {
            if (dish == null) {return res.status(400).json("no such dish exists")}
            else {
                var halls = [];
                for (i = 0; i < dish.halls.length; i++)
                {
                    var hall = await hallModel.findById(dish.halls[i])
                        .then(hall => {
                            if (hall == null) {return res.status(400).json("hall error")}
                            else {
                                return hall;
                            }
                        })
                        .catch((err) => {
                            return res.status(400).send("query error")
                        });
                    halls.push(hall);
                }
                res.json(halls);
            }
        })
        .catch(err => {
            res.status(400).json(err);
        })
})*/

module.exports = router;