const ObjectId = require('mongodb').ObjectId;
const router = require('express').Router();
const moment= require ('moment');
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')

const Book = require('../models/book');
const Admin = require('../models/admin');

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

    },
    {
        airline: 'PAL',
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

    },
    {
        airline: 'PAL',
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

        res.status(200).send({status: 200, message: 'Success!', data: flights});
        return;
    }
    
    res.status(200).send({status: 200, message: 'Success!', data: availableFligths});
    return;
};

// save booking function
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

// get booking function
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
const login= async (body, res) => {
   
   
    const adminLog = await Admin.findOne({ adminId: body.adminId })
    .exec((err, adminlog)=>{
        
        if (!adminLog) {return res.status(401).send({ message: 'invalid email or password' })}

        bcrypt.compare(body.password, Admin.password, (err, isMatch) => {
            if (!isMatch)
            {
            res.status(401).send({ message: 'pataka!' })
            console.log("na wrong!");
            return;
            }
    
    
            var payload = user._id
            var token = jwt.encode(payload, '1234')
    
            const response = {
                id: user._id,
                adminId: admin.adminId,
                token
            }
    
            res.status(200).send({ message: 'Login successful.', data: response })
        });
    });

    // 

    console.log(adminLog);
} 

const register= (body, res) => {
    
    const user = new Admin(body)
  
    user.save((err, result) => {

        if (user === null) {
            res.status(500).send({status: 500, message: 'Error occured during save.', err});
            return
        }else{
        res.status(201).send({status: 201, message: 'Saved!', data: user});
        return;}
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
    
    res.status(403).send({status: 403, message: 'Invalid request!', data: 0 });
    return;
});

router.get('/book', (req, res) => {
    const { query } = req;
    getBookings(query, res);
});

router.post('/adminregister', (req, res) => {
    const { body } = req;
    if (body) {
        register(body, res);
        return;
    }  
    res.status(403).send({status: 403, message: 'Invalid request!', data: 0 });
    return;
});

router.post('/adminlog', (req,res)=> {

    const { body } = req;
    if (body) {
      login(body, res);
        return;
    }  
    res.status(403).send({status: 403, message: 'Invalid request!', data: 0 });
    return;

});

module.exports = router;