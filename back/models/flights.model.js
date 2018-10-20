var restful= require ('node-restful');
var mongoose= require('mongoose');

const flightSchema = new mongoose.Schema({
    clientId: { type: String },
    airliner: { type: String },
    no: { type: String },
    originCode: { type: String },
    origin: { type: String },
    destCode: { type: String },
    destination: { type: String },
    flightDate: { type: Date },
    departureTime: { type: String },
    ecoPrice: { type: Number },
    busPrice: { type: Number },
    capacity: { type: Number},
    isDeleted: { 
        type: Boolean,
        default: false,
    },
});

module.exports = restful.model('Flights', flightSchema);
