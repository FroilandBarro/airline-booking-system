const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment= require ('moment');

const Book = require('../models/book');

const availableFligths = [
    {
        orig: 'DVO',
        dest: 'MNL',
        flight: 'PAL316A',
        dep: '13:15',
        arr: '14:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,

    },
    {
        orig: 'DVO',
        dest: 'MNL',
        flight: 'PAL316A',
        dep: '17:15',
        arr: '18:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,

    },
    {
        orig: 'MNL',
        dest: 'DVO',
        flight: 'PAL316B',
        dep: '15:15',
        arr: '16:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,

    },
    {
        orig: 'MNL',
        dest: 'DVO',
        flight: 'PAL316B',
        dep: '08:15',
        arr: '09:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,

    },
    {
        orig: 'DVO',
        dest: 'CEB',
        flight: 'CPAC423A',
        dep: '06:45',
        arr: '08:15',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'CEB',
        dest: 'DVO',
        flight: 'CPAC423A',
        dep: '09:45',
        arr: '11:15',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'DVO',
        dest: 'CEB',
        flight: 'CPAC423A',
        dep: '13:15',
        arr: '14:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'CEB',
        dest: 'DVO',
        flight: 'CPAC423A',
        dep: '16:00',
        arr: '17:15',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'DVO',
        dest: 'CLK',
        flight: 'AAS645A',
        dep: '07:15',
        arr: '08:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'CLK',
        dest: 'DVO',
        flight: 'AAS645A',
        dep: '09:50',
        arr: '11:20',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'DVO',
        dest: 'CLK',
        flight: 'AAS645A',
        dep: '12:10',
        arr: '13:40',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
    {
        orig: 'CLK',
        dest: 'DVO',
        flight: 'AAS645A',
        dep: '14:30',
        arr: '16:00',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
    },
];

const getFlights = (query, res) => {
    const { orig, dest } = query;
    if (orig && dest) {
        const flights = [];
        availableFligths.map((f) => {
            if (f.orig === orig && f.dest === dest) {
                flights.push(f);
            }
        });

        res.status(200).send({status: 200, message: 'Success!', data: flights});
        return;
    }
    
    res.status(200).send({status: 200, message: 'Success!', data: availableFligths});
    return;
};

const saveBooking = (body, res) => {
    if (body._id) {
        res.status(200).send({status: 200, message: 'Updated!', data: body});
        return;
    }
    const newBooking = new Book(body);
    newBooking.bookDate = new Date();
    newBooking.bookTime = moment().utcOffset('+0800').format('HH:mm:ss');
    newBooking.save((err) => {
        if (err) {
            res.status(500).send({status: 500, message: 'Error occured during save.', err});
            return
        }

        res.status(201).send({status: 201, message: 'Saved!', data: newBooking});
        return;
    })
    
};

const getBookings = async (query, res) => {
    await Book
        .find(query)
        .exec((err, bookings) => {
            if (err) {
                res.status(500).send({status: 500, message: 'Internal server error!', err });
                return;
            }
            res.status(200).send({status: 200, message: 'Success!', data: bookings });
            return;
        });
};

router.get('/', (req, res) => {
    const { query, query: { orig, dest } } = req;
    getFlights(query, res);
});

router.post('/book', (req, res) => {
    const { body} = req;
    if (body) {
        saveBooking(body, res);
        return;
    }
    
    res.status(403).send({status: 403, message: 'Invalid request!', data: 0 });
    return;
});

router.get('/book', (req, res) => {
    const { query } = req;
    getBookings(query, res);
});

module.exports = router;