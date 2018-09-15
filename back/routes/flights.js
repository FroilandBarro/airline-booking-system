const router = require('express').Router();

const availableFligths = [
    {
        orig: 'DVO',
        dest: 'MNL',
        flight: 'PAL316A',
        date: new Date(),
        dep: 1315,
        arr: 1445,
        seats: 10,
        price: 1675.00,
    },
    {
        orig: 'DVO',
        dest: 'CEB',
        flight: 'CPAC423A',
        date: new Date(),
        dep: 1315,
        arr: 1445,
        seats: 10,
        price: 1245.00,
    },
    {
        orig: 'DVO',
        dest: 'CLK',
        flight: 'AAS645A',
        date: new Date(),
        dep: 1315,
        arr: 1445,
        seats: 10,
        price: 1836.00,
    },
];

const getFlights = (query, res) => {
    const { orig, dest } = query;
    const flights = [];
    availableFligths.map((f) => {
        if (f.orig === orig && f.dest === dest) {
            flights.push(f);
        }
    });
    res.status(200).send({status: 200, message: 'Success!', data: flights});
    return;
};

router.get('/', (req, res) => {
    const { query, query: { orig, dest } } = req;
    if (orig && dest) {
        getFlights(query, res);
        return;
    }
    
    res.status(403).send({status: 403, message: 'Invalid request!', data: 0 });
    return;
});

module.exports = router;