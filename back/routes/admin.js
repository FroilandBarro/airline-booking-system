const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment = require('moment');

// models
const Flights = require('../models/flights.model');

// constants
const locations = [
  { code: 'DVO', name: 'DAVAO' },
  { code: 'MNL', name: 'MANILA' },
  { code: 'CEB', name: 'CEBU' },
  { code: 'CLK', name: 'CLARK' },
  { code: 'BHL', name: 'BOHOL' },
  { code: 'PWN', name: 'PALAWAN' },
];
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

const getPlace = (code) => {
  let selected = '';
  locations.map(o => {
    if (o.code === code) {
      selected = o.name;
    }
  });
  return selected;
}

const updateFlight = async (body, res) => {
  const { _id } = body;
  const flightDate = convertDate(body.flightDate);
  const origin = getPlace(body.originCode);
  const destination = getPlace(body.destCode);

  await Flights.findOneAndUpdate(
    { _id }, 
    { $set: {
      airliner: body.airliner,
      no: body.no,
      originCode: body.originCode,
      origin: origin,
      destCode: body.destCode,
      destination: destination,
      flightDate: flightDate,
      departureTime: body.departureTime,
      ecoPrice: body.ecoPrice,
      busPrice: body.busPrice,
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
  body.origin = getPlace(body.originCode);
  body.destination = getPlace(body.destCode);

  console.log('body: ', body);

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
