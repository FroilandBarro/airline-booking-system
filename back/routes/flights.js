const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment = require('moment');
// const bcrypt = require('bcrypt')
// const jwt = require('jwt-simple')

const Book = require('../models/book');
const Admin = require('../models/admin');
const Client = require('../models/client');

const availableFligths = [
    {
        airline: 'PAL',
        orig: 'DVO',
        dest: 'MNL',
        flight: 'PAL316A',
        dep: '13:15',
        arr: '14:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'MNL',
        dest: 'DVO',
        flight: 'PAL316B',
        dep: '15:15',
        arr: '16:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'DVO',
        dest: 'MNL',
        flight: 'CPAC416A',
        dep: '17:15',
        arr: '18:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'MNL',
        dest: 'DVO',
        flight: 'PAL416B',
        dep: '08:15',
        arr: '09:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'MNL',
        dest: 'CEB',
        flight: 'PAL516B',
        dep: '09:15',
        arr: '10:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'CEB',
        dest: 'MNL',
        flight: 'PAL516B',
        dep: '11:15',
        arr: '12:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'MNL',
        dest: 'CEB',
        flight: 'PAL516B',
        dep: '01:15',
        arr: '02:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'CEB',
        dest: 'MNL',
        flight: 'PAL516B',
        dep: '03:15',
        arr: '04:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },

    {
        airline: 'CPAC',
        orig: 'DVO',
        dest: 'CEB',
        flight: 'CPAC423A',
        dep: '06:45',
        arr: '08:15',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'CEB',
        dest: 'DVO',
        flight: 'CPAC423A',
        dep: '09:45',
        arr: '11:15',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'DVO',
        dest: 'CEB',
        flight: 'CPAC423A',
        dep: '13:15',
        arr: '14:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'CEB',
        dest: 'DVO',
        flight: 'CPAC423A',
        dep: '16:00',
        arr: '17:15',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'Air-A',
        orig: 'DVO',
        dest: 'CLK',
        flight: 'AAS645A',
        dep: '07:15',
        arr: '08:45',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'Air-A',
        orig: 'CLK',
        dest: 'DVO',
        flight: 'AAS645A',
        dep: '09:50',
        arr: '11:20',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'Air-A',
        orig: 'DVO',
        dest: 'CLK',
        flight: 'AAS645A',
        dep: '12:10',
        arr: '13:40',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'Air-A',
        orig: 'CLK',
        dest: 'DVO',
        flight: 'AAS645A',
        dep: '14:30',
        arr: '16:00',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'MNL',
        dest: 'CLK',
        flight: 'PAL745A',
        dep: '6:10',
        arr: '7:40',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'CLK',
        dest: 'MNL',
        flight: 'PAL745A',
        dep: '8:10',
        arr: '9:40',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'MNL',
        dest: 'CLK',
        flight: 'PAL745B',
        dep: '10:10',
        arr: '11:30',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'CLK',
        dest: 'MNL',
        flight: 'PAL745B',
        dep: '12:00',
        arr: '13:30',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'CPAC',
        orig: 'CEB',
        dest: 'CLK',
        flight: 'PAL845A',
        dep: '10:10',
        arr: '11:30',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'CLK',
        dest: 'CEB',
        flight: 'PAL845B',
        dep: '12:00',
        arr: '13:30',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'CLK',
        dest: 'CEB',
        flight: 'PAL845A',
        dep: '12:10',
        arr: '13:30',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
    {
        airline: 'PAL',
        orig: 'CEB',
        dest: 'CLK',
        flight: 'PAL845B',
        dep: '14:00',
        arr: '15:40',
        economySeats: 10,
        businessSeats: 5,
        ecoPrice: 1675.00,
        busPrice: 4375.00,
        departdate: Date,
        returndate: Date,
    },
];

//getflights function
const getFlights = (query, res) => {
    const { orig, dest } = query;
    if (orig && dest) {
        const flights = [];
        availableFligths.map((f) => {
            if (f.orig === orig && f.dest === dest) {
                flights.push(f);
            }
        });

        res.status(200).send({ status: 200, message: 'Success!', data: flights });
        return;
    }

    res.status(200).send({ status: 200, message: 'Success!', data: availableFligths });
    return;
};

// save booking function
const saveBooking = (body, res) => {
    if (body._id) {
        res.status(200).send({ status: 200, message: 'Updated!', data: body });
        return;
    }
    const newBooking = new Book(body);
    newBooking.bookDate = new Date();
    newBooking.bookTime = moment().utcOffset('+0800').format('HH:mm:ss');
    newBooking.save((err) => {
        if (err) {
            res.status(500).send({ status: 500, message: 'Error occured during save.', err });
            return
        }

        res.status(201).send({ status: 201, message: 'Saved!', data: newBooking });
        return;
    })

};

// get booking function
const getBookings = async (query, res) => {
    const { name } = query;
    if( name ){
        const booked = [];
        Book.map((n) =>{
            if(n.name === name){
                booked.push(n);
            }
        });
        res.status(200).send({status: 200, msg: "success!", data: booked});
        return
    }
    res.status(200).send({status: 200, msg:"invalid", data:Book});
    return
};

const clientlogin = async (body, res) => {
    await Client.findOne({ email: body.email, password: body.password })
        .exec((err, clientlog) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error' });
                return;
            }

            if (!clientlog) {
                res.status(401).send({ message: 'invalid email or password' });
                console.log("wrong");
                return;
            }
            else {
                console.log(clientlog);
                return res.status(200).send({ message: 'login successful', data: clientlog });

            }
        });
}
const adminlogin = async (body, res) => {
    await Admin.findOne({ adminId: body.adminId, password: body.password })
        .exec((err, adminlog) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error' });
                return;
            }

            if (!adminlog) {
                res.status(401).send({ message: 'invalid email or password' });
                console.log("wrong");
                return;
            }
            else {
                console.log(adminlog);
                return res.status(200).send({ message: 'login successful', data: adminlog });

            }
        });
}

const register = (body, res) => {

    const user = new Admin(body)

    user.save((err, result) => {

        if (user === null) {
            res.status(500).send({ status: 500, message: 'Error occured during save.', err });
            return
        } else {

            res.status(201).send({ status: 201, message: 'Saved!', data: user });
            return;
        }
    })
}

const clientregister = (body, res) => {

    const user = new Client(body)

    user.save((err, result) => {

        if (user === null) {
            res.status(500).send({ status: 500, message: 'Error occured during save.', err });
            return
        } else {
            res.status(201).send({ status: 201, message: 'Saved!', data: user });
            return;
        }
    })
}


//routers
router.get('/', (req, res) => {
    const { query, query: { orig, dest } } = req;
    getFlights(query, res);
});

router.post('/book', (req, res) => {
    const { body } = req;
    if (body) {
        saveBooking(body, res);
        return;
    }

    res.status(403).send({ status: 403, message: 'Invalid request!', data: 0 });
    return;
});

router.get('/book', (req, res) => {
    const { query: { name } } = req;
    getBookings(query, res);
    return;
});

router.post('/adminregister', (req, res) => {
    const { body } = req;
    if (body) {
        register(body, res);
        return;
    }
    res.status(403).send({ status: 403, message: 'Invalid request!', data: 0 });
    return;
});

router.post('/clientregister', (req, res) => {
    const { body } = req;
    if (body) {
        clientregister(body, res);
        console.log(body);
        return;
    }
    res.status(403).send({ status: 403, message: 'Invalid request!', data: 0 });
    return;
});

router.post('/clientlogin', (req, res) => {

    const { body } = req;
    if (body) {
        clientlogin(body, res);
        return;
    }
    res.status(403).send({ status: 403, message: 'Invalid request!', data: 0 });
    return;

});
router.post('/adminlogin', (req, res) => {

    const { body } = req;
    if (body) {
        adminlogin(body, res);
        return;
    }
    res.status(403).send({ status: 403, message: 'Invalid request!', data: 0 });
    return;

});

module.exports = router;
 //inside the register
 // bcrypt.compare(body.password, adminlog.password, (err, isMatch) => {

            //     if (err) {
            //         res.status(500).send({ message: 'Internal server error!' });
            //         return;
            //     }

            //     if (!isMatch) {
            //         res.status(401).send({ message: 'Password did not matched!'});
            //         console.log(adminlog.password);
            //         return;
