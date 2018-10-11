var restful= require ('node-restful');
var mongoose= require('mongoose');

const clientSchema= new mongoose.Schema ({
    name:{
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    birthdate: {
        type: String,
    },
  
});
module.exports = restful.model('Client', clientSchema);