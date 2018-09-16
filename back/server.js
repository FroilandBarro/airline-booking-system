const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const User = require('./models/user.js')
const Post = require('./models/post')
const config = require('./config/config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully connected database.');
    }
});

app.use(cors())
app.use(bodyParser.json())

// load routes
const flights = require('./routes/flights');
const auth = require("./auth");

app.use('/api/flights', flights);

app.listen(7000); 