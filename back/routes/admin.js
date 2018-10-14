const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment = require('moment');

// models
const Flights = require('../models/flights.model');

// controllers 
const getFlights = async (res) => {
  await Flights.find({})
    .exec()
    .then((flights) => {
      res.status(200).send({messaged: 'Success!', data: flights});
      return;
    })
    .catch((err) => {
      res.status(500).send({messaged: 'Failed to get flights!', err});
      return;
    });
};

// Methods
router.post('/save-flights', async (req, res) => {
  const { body, body: { _id, flightDate } } = req;

  const fd = new Date(flightDate);
  body.flightDate = moment(fd).format('MM-DD-YYYY');
  console.log(body);
  
  if (!_id) {
    const newFlight = new Flights(body);
    await newFlight.save((err) => {
      if (err) {
        res.status(500).send({messaged: 'Internal server error!', err});
        return;
      }

      getFlights(res);
    });
  }
});

module.exports = router;