const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment = require('moment');

// models
const Flights = require('../models/flights.model');

// controllers 
const convertDate = (date) => {
  const fd = new Date(date);
  return moment(fd).format('MM-DD-YYYY');
};

const getFlights = async (res) => {
  const query = {};
  const { airliner } = this;
  if (airliner) {
    query.airliner = airliner;
    console.log(query);
  }
  await Flights.find(query, (err, flights) => {
    if (err) {
      res.status(500).send({message: 'Failed to get flights!', err});
      return;
    }
    res.status(200).send({message: 'Success!', data: flights});
    return;
  });
};

const updateFlight = async (body, res) => {
  const { _id } = body;
  const flightDate = convertDate(body.flightDate);
  await Flights.findOneAndUpdate(
    { _id }, 
    { $set: {
      airliner: body.airliner,
      no: body.no,
      originCode: body.originCode,
      origin: body.origin,
      destCode: body.destCode,
      destination: body.destination,
      flightDate: flightDate,
      departureTime: body.departureTime,
      capacity: body.capacity,
    }},
    { new: true },
    (err) => {
      if (err) {
        res.status(500).send({message: 'Failed to update flights!', err});
        return;
      }
      getFlights(res);
    }
  );
};

// Methods
router.post('/save-flights', async (req, res) => {
  const { body, body: { _id, flightDate } } = req;
  body.flightDate = convertDate(flightDate);
  
  if (!_id) {
    const newFlight = new Flights(body);
    await newFlight.save((err) => {
      if (err) {
        res.status(500).send({message: 'Internal server error!', err});
        return;
      }

      getFlights(res);
    });
  } else {
    updateFlight(body, res);
  }
});

router.get('/flights', (req, res) => {
  const { query } = req;

  if (query && query.airliner) {
    const { airliner } = query;
    this.airliner = airliner;    
  }
  getFlights(res);
});

module.exports = router;
