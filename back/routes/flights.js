const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment = require('moment');
// const bcrypt = require('bcrypt')
// const jwt = require('jwt-simple')

const Book = require('../models/book');
const Admin = require('../models/admin');
const Client = require('../models/client');
const Flights = require('../models/flights.model');

// const availableFligths = [
//     {
//         airline: 'PAL',
//         orig: 'DVO',
//         dest: 'MNL',
//         flight: 'PAL316A',
//         dep: '13:15',
//         arr: '14:45',
//         economySeats: 10,
//         businessSeats: 5,
//         ecoPrice: 1675.00,
//         busPrice: 4375.00,
//         departdate: Date,
//         returndate: Date,
//     },
// ];

//getflights function
const getFlights = async (query, res) => {
    const { orig, dest } = query;
    if (orig && dest) {
        const originCode = orig;
        const destCode = dest;

        const flights = await Flights.find({ originCode, destCode });

        flights.map(o => {
            const date = new Date(o.flightDate);
            o.flightDate = moment(date).format('YYYY-MM-DD');
        });
        
        res.status(200).send({ status: 200, message: 'Success!', data: flights });
        return;
    }
};
const getAllFlights = async (res) => {
        const flights = await Flights.find({ });

        res.status(200).send({ status: 200, message: 'Success!', data: flights });
        return;
};

const getreturnFlights = async (query, res) => {
    const { orig, dest } = query;
    if (orig && dest) {
        const originCode = orig;
        const destCode = dest;

        const flights = await Flights.find({ originCode, destCode });

        flights.map(o => {
            const date = new Date(o.flightDate);
            o.flightDate = moment(date).format('YYYY-MM-DD');
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

const specificBook = async (body, res) => {
    await Book.find({ clientName: body.name})
        .exec((err, booklog) => {
            if (err) {
                res.status(500).send({ message: 'Internal server error' });
                return;
            }

            if (!body.name) {
                res.status(401).send({ message: 'invalid email or password' });
                console.log("wrong");
                return;
            }
            else {
                console.log(booklog);
                return res.status(200).send({ message: 'there is a booked flights', data: booklog });

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
const cancelFlights = async (body, res) => {
    const { _id } = body;
    await Book.findOneAndUpdate({ _id }, { $set: { isCanceled: true } }, { new: true }, (err, data) => {
        if(err){
            res.status(500).send({message: 'Internal server error', err });
            return;
        }
        res.status(200).send({message: 'Flight cancelled.', data });
        return;
    });
}

//routers
router.get('/', (req, res) => {
    const { query, query: { orig, dest } } = req;
    getFlights(query, res);
});

router.get('/getallflight', (req, res) => {
   getAllFlights(res);
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

router.get('/returnflights-available', (req, res) =>{
    const { query, query: { orig, dest } } = req;
        getFlights(query, res);    
})

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
router.post("/specificbooks", (req, res) => {
    const { body } = req;
    if (body) {
        specificBook(body, res);
        return;
    }
    res.status(403).send({ status: 403, message: 'Invalid request!', data: 0 });
    return;
})

router.post("/cancelflight", (req, res) => {
    const {body} = req;
    if (body) {
        cancelFlights(body, res);
        return;
    }res.status(403).send({status: 403, msg: "invalid request", data: 0});
})

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
