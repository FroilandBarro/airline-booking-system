var restful= require ('node-restful');
var mongoose= require('mongoose');

const clientSchema= new mongoose.Schema ({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    birthdate: {
        type: String,
    },
    bookData: {
        type: Array,
        default: [],
    }
});
module.exports = restful.model('Client', clientSchema);