var restful= require ('node-restful');
var mongoose= require('mongoose');
var moment= require ('moment');

const bookSchema = new mongoose.Schema({
    departdate: {
        type: Date
    },
    returdate: {
        type: Date
    },
    bookDate: {
        type: Date
    },
    bookTime: {
        type: String,
    },
    clientName: {
        type: String,
    },
    adults: {
        type: Number,
    },
    child: {
        type: Number,
    },
    class: {
        type: String,
    },
    flightDetails: {
        type: Object,
        default: {},
    },
    fees: { 
        type: Object,
        default: {},
    },
    isCanceled: { 
        type: Boolean,
        default: false,
    },
    isDeleted: { 
        type: Boolean,
        default: false,
    },
});

module.exports = restful.model('Book', bookSchema);
