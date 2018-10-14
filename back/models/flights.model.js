var restful= require ('node-restful');
var mongoose= require('mongoose');

const flightSchema = new mongoose.Schema({
    no: {
        type: String,
    },
    originCode: {
        type: String,
    },
    origin: {
        type: String,
    },
    destCode: {
        type: String,
    },
    destination: {
        type: String,
    },
    flightDate: {
        type: Date,
    },
    departureTime: {
        type: String,
    },
    capacity: {
        type: Number
    },
    isDeleted: { 
        type: Boolean,
        default: false,
    },
});

module.exports = restful.model('Flights', flightSchema);
