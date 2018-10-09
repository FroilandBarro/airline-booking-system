// const bcrypt = require('bcrypt')
// const jwt = require('jwt-simple')

const book = require('./models/book.js');


module.exports = {
    book: (req, res) => {
        var bookData = req.body;
        var user = new book(bookData);
        user.save((err, result) => {
            if (err) console.log("error")
            else {
                res.sendStatus(200);
            }
        })
    },
    register: (req, res) => {
        var userData = req.body;
        var user = new User(userData)
      
        user.save((err, result) => {
            if (err) console.log("error")
            else {
                res.sendStatus(200)
            }
        })
    },
    login: async (req, res) => {
        var loginData = req.body;

        var user = await User.findOne({ email: loginData.email })

        if (!user) {return res.status(401).send({ message: 'invalid email or password' })}

        // bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
        //     if (!isMatch) return res.status(401)
        //         .send({ message: 'invalid email or password' })


        //     var payload = user._id
        //     var token = jwt.encode(payload, '1234')

        //     const response = {
        //         id: user._id,
        //         firstname: user.firstname,
        //         lastname: user.lastname,
        //         email: user.email,
        //         token
        //     }
        //     res.status(200).send({ message: 'Login successful.', data: response })
        // })

    }
} 