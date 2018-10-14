const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const config = require('./config/config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Successfully connected database.');
    }
});

const port = process.env.PORT || 8080;
const env = (port === 8080 ? 'development' : 'productions')

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

// routes
const flights = require('./routes/flights');
const admin = require('./routes/admin');

app.use('/api/flights', flights);
app.use('/api/admin', admin);


app.listen(port, () => {
    console.log(`Server is in ${env} at port ${port}.`);
}); 